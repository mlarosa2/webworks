module.exports = class CollectionItem {
    constructor(db) {
        this.db = db;
    }

    get(req, res) {
        this.db.collection('CollectionItems').find({belongsTo: req.params.belongsTo, title: req.params.title}).toArray((err, result) => {
            if (err) throw err;
            if (result.length === 1) {
                res.send(result[0]);
            } else {
                res.sendStatus(404);
            }
        });
    }
};