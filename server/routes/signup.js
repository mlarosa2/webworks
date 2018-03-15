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
        let password = '';
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                res.sendStatus(500);
            } else {
                password = hash;
                this.db.collection('Users').insertOne({ name: req.body.username,  password: password, email: req.body.email}).toArray((err, result) => {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });
            }
        });
    }
};