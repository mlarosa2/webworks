const ObjectId     = require('mongodb').ObjectId;

module.exports = class FormResponses {
    constructor(db) {
        this.db = db;
    }

    get(req, res) {
        this.db.collection('FormResponses').find({_id: ObjectId(req.params.mongoId)}).toArray((err, result) => {
            if (err) throw err;
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        });
    }

    delete(req, res) {
        this.db.collection('FormResponses').deleteOne({_id: ObjectId(req.params.mongoId)}, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    }
};