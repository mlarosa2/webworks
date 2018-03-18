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

    delete(req, res) {
        if (!csrfCheck(req.body.csrf, res)) {
            return;
        }
        this.db.collection('FormResponses').deleteOne({_id: req.params.mongoId}, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    }
};