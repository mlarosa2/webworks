module.exports = class Login {
    constructor(db) {
        this.db = db;
    }

    post(req, res) {
        this.db.collection('Users').find({ name: req.body.username }).toArray((err, result) => {
            if (err) throw err;
            if (result.length > 0 && req.body.password === result[0].password) {
                res.sendStatus(200);
            } else {
                res.sendStatus(401);
            }
        });
    }
};