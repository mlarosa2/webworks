const csrfCheck = require('./csrf-token-check');
const bcrypt    = require('bcrypt');

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
                bcrypt.compare(req.body.password, result[0].password, (err, res) => {
                    if (res) {
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(401);
                    }
                });
            }
        });
    }
};