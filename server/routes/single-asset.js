const fs = require('fs');

module.exports = class SingleAsset {
    constructor(db) {
        this.db = db;
    }

    get(req, res) {
        this.db.collection('Assets').find({title: req.body.title, type: req.body.type}).toArray((err, result) => {
            if (err) throw err;
            if (result.length === 1) {
                res.send(result[0]);
            } else {
                res.sendStatus(404);
            }
        });
    }
};