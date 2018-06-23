const bcrypt    = require('bcrypt');
const crypto     = require('crypto');

module.exports = class Login {
    constructor(db) {
        this.db = db;
    }

    post(req, res) {
        this.db.collection('Users').find({ name: req.body.username }).toArray((err, result) => {
            if (err) throw err;
            if (result[0]) {
                bcrypt.compare(req.body.password, result[0].password, (err, allGood) => {
                    if (allGood) {
                        const salt1             = 'karl';
                        const salt2             = 'marx';
                        const hashUserCipher    = crypto.createCipher('aes-256-ctr', salt1);
                        const hashPassCipher    = crypto.createCipher('aes-256-ctr', salt2);

                        let hashUser = hashUserCipher.update(req.body.username, 'utf8', 'hex');
                        hashUser += hashUserCipher.final('hex')
                        let hashPass = hashPassCipher.update(req.body.password, 'utf8', 'hex');
                        hashPass += hashPassCipher.final('hex');
                        
                        res.append('Set-Cookie', '46a11f1333d6b2079f8da41e63d810406e9de5b6eb18c80f434f6c79da1f525b=' + hashUser + '; Path=/;');
                        res.append('Set-Cookie', 'a6235752ef51e86cdf1d56634948c32f75fe6a492e212797315ea43f5ecfa66e=' + hashPass + '; Path=/;');
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(401);
                    }
                });
            }
        });
    }

    postFe(req, res) {
        let user, pass;
        if (req.headers.cookie) {
            const cookies = Login.parseCookie(req.headers.cookie);
            const userIdx = Login.findCookie('46a11f1333d6b2079f8da41e63d810406e9de5b6eb18c80f434f6c79da1f525b', cookies);
            const passIdx = Login.findCookie('a6235752ef51e86cdf1d56634948c32f75fe6a492e212797315ea43f5ecfa66e', cookies);
            if (userIdx > -1) {
                user = cookies[userIdx + 1];
            } else {
                res.sendStatus(200);
                return; 
            }

            if (passIdx > -1) {
                pass = cookies[passIdx + 1];
            } else {
                res.sendStatus(200);
                return;
            }
        } else {
            res.sendStatus(200);
            return;
        }

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
                        res.send(JSON.stringify({user: plainUser}));
                    } else {
                        res.sendStatus(401);
                    }
                });
            }
        });
    }

    delete(req, res) {
        let user, pass;
        if (req.headers.cookie) {
            const cookies = Login.parseCookie(req.headers.cookie);
            const userIdx = Login.findCookie('46a11f1333d6b2079f8da41e63d810406e9de5b6eb18c80f434f6c79da1f525b', cookies);
            const passIdx = Login.findCookie('a6235752ef51e86cdf1d56634948c32f75fe6a492e212797315ea43f5ecfa66e', cookies);
            if (userIdx > -1) {
                user = cookies[userIdx + 1];
            } else {
                res.sendStatus(500);
                return; 
            }

            if (passIdx > -1) {
                pass = cookies[passIdx + 1];
            } else {
                res.sendStatus(500);
                return;
            }
        } else {
            res.sendStatus(500);
            return;
        }

        res.append('Set-Cookie', '46a11f1333d6b2079f8da41e63d810406e9de5b6eb18c80f434f6c79da1f525b=' + user + '; Path=/;expires=Thu, Jan 01 1970 00:00:00 UTC;');
        res.append('Set-Cookie', 'a6235752ef51e86cdf1d56634948c32f75fe6a492e212797315ea43f5ecfa66e=' + pass + '; Path=/;expires=Thu, Jan 01 1970 00:00:00 UTC;');

        res.sendStatus(200)
    }

    static parseCookie(cookie) {
        const firstCut = cookie.split('=');
        let cookies  = [];
        
        for (let i= 0; i < firstCut.length; i++) {
            let cookieLength = firstCut[i].length;
            if (firstCut[i][cookieLength - 1] === ';') {
                firstCut[i] = firstCut[i].substr(0, cookieLength - 1);
            }
        }
        
        for (let i= 0; i < firstCut.length; i++) {
            cookies = cookies.concat(
                firstCut[i].split(';').map(cut => cut.trim())
            );
        }

        return cookies;
    }

    static findCookie(key, cookies) {
        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i] === key) {
                return i;
            }
        }

        return -1;
    }
};