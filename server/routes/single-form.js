module.exports = class SingleForm {
    constructor(db) {
        this.db = db;
    }

    get(req, res) {
        this.db.collection('Forms').find({title: req.params.title}).toArray((err, result) => {
            if (err) throw err;
            if (result.length === 1) {
                res.send(result[0]);
            } else {
                res.sendStatus(404);
            }
        });  
    }
};