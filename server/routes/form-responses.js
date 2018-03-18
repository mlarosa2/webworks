module.exports = class FormResponses {
    constructor(db) {
        this.db = db;
    }

    get(req, res) {
        this.db.collection('FormResponses').find({wwbelongstocheck33245: req.params.belongsTo}).toArray((err, result) => {
            if (err) throw err;
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        });
    }
}