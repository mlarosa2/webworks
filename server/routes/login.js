const csrfCheck = require('./csrf-token-check');
const bcrypt    = require('bcrypt');
const crypto     = require('crypto');

module.exports = class Login {
    constructor(db) {
        this.db = db;
    }

    post(req, res) {
        if (!csrfCheck(req.headers['csrf-token'], res)) {
            return;
        }
        this.db.collection('Users').find({ name: req.body.username }).toArray((err, result) => {
            if (err) throw err;
            if (result[0]) {
                bcrypt.compare(req.body.password, result[0].password, (err, allGood) => {
                    if (allGood) {
                        const salt1             = 'karl';
                        const salt2             = 'marx';
                        const hashUserKey       = crypto.createHash('sha256');
                        const hashPassKey       = crypto.createHash('sha256');
                        const hashUserCipher    = crypto.createCipher('aes-256-ctr', salt1);
                        const hashPassCipher    = crypto.createCipher('aes-256-ctr', salt2);

                        hashUserKey.update('junkie');
                        let hashUser = hashUserCipher.update(req.body.username, 'utf8', 'hex');
                        hashUser += hashUserCipher.final('hex')
                        hashPassKey.update('scores');
                        let hashPass = hashPassCipher.update(req.body.password, 'utf8', 'hex');
                        hashPass += hashPassCipher.final('hex');
                        res.append('Set-Cookie', hashUserKey.digest('hex') + '=' + hashUser + '; Path=/;');
                        res.append('Set-Cookie', hashPassKey.digest('hex') + '=' + hashPass + '; Path=/;');
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(401);
                    }
                });
            }
        });
    }

    postFe(req, res) {
        if (!csrfCheck(req.headers['csrf-token'], res)) {
            return;
        }
        let user         = req.cookie['46a11f1333d6b2079f8da41e63d810406e9de5b6eb18c80f434f6c79da1f525b'];
        let pass         = req.cookie['a6235752ef51e86cdf1d56634948c32f75fe6a492e212797315ea43f5ecfa66e'];
        const salt1      = 'karl';
        const salt2      = 'marx';
        
        let decipherUser = crypto.createDecipher('aes-256-ctr', salt1);
        let plainUser    = decipherUser.update(user, 'hex', 'utf8') 
        plainUser       += decipherUser.final('utf8');

        let decipherPass = crypto.createDecipher('aes-256-ctr', salt2);
        let plainPass    = decipherPass.update(pass, 'hex', 'utf8') 
        plainPass       += decipherPass.final('utf8');
        this.db.collection('Users').find({ name: plainUser }).toArray((err, result) => {
            if (err) throw err;
            if (result[0]) {
                bcrypt.compare(plainPass, result[0].password, (err, allGood) => {
                    if (allGood) {
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(401);
                    }
                });
            }
        });
    }
};