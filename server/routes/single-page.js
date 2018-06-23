const PageParser   = require('../page-parser/main');

module.exports = class SinglePage {
    constructor(db) {
        this.db = db;
    }

    get(req, res) {
        this.db.collection('Pages').find({title: req.params.title}).toArray((err, result) => {
            if (err) throw err;
            if (result.length === 1) {
                res.send(result[0]);
            } else {
                res.sendStatus(404);
            }
        }); 
    }

    delete(req, res) {
        this.db.collection('Pages').deleteOne({title: req.params.title}, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    }

    put(req, res) {
        const query         = { title: req.params.title };
        const updatedValues = req.body.body;
        PageParser(req.body.body.body).then(parsedPage => {
            updatedValues.parsed = parsedPage;
            this.db.collection('Pages').updateOne(query, updatedValues, (err, result) => {
                if (err) throw err;
                res.sendStatus(200);
            });
        },
        err => err);
    }
};