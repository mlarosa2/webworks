const csrfCheck = require('./csrf-token-check');

module.exports = class SingleTemplate {
    constructor(db) {
        this.db = db;
    }

    get(req, res) {
        this.db.collection('Templates').find({title: req.params.title}).toArray((err, result) => {
            if (err) throw err;
            if (result.length === 1) {
                res.send(result[0]);
            } else {
                res.sendStatus(404);
            }
        });
    }

    delete(req, res) {
        if (!csrfCheck(req.body.csrf, res)) {
            return;
        }
        this.db.collection('Templates').deleteOne({title: req.params.title}, (err, result) => {
            if (err) throw err;

            res.sendStatus(200);
        });
    }
};