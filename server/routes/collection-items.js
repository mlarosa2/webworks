const csrfCheck = require('./csrf-token-check');

module.exports = class CollectionItems {
    constructor(db) {
        this.db = db;
    }

    post(req, res) {
        if (!csrfCheck(req.headers['csrf-token'], res)) {
            return;
        }
        this.db.collection('CollectionItems').insertOne({title: req.body.title, fields: req.body.fields, belongsTo: req.body.belongsTo}, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    }

    delete(req, res) {
        if (!csrfCheck(req.headers['csrf-token'], res)) {
            return;
        }
        this.db.collection('CollectionItems').deleteOne({title: req.body.title, belongsTo: req.body.belongsTo}, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    }

    put(req, res) {
        if (!csrfCheck(req.headers['csrf-token'], res)) {
            return;
        }
        const query         = { title: req.body.title, belongsTo: req.body.belongsTo };
        const updatedValues = { fields: req.body.fields, title: req.body.newTitle, belongsTo: req.body.belongsTo };

        this.db.collection('CollectionItems').updateOne(query, updatedValues, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    }
};