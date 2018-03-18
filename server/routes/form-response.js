module.exports = class FormResponses {
    constructor(db) {
        this.db = db;
    }

    get(req, res) {
        this.db.collection('FormResponses').find({_id: req.params.mongoId}).toArray((err, result) => {
            if (err) throw err;
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        });
    }
};