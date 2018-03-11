const csrfCheck = require('./csrf-token-check');

module.exports = class Forms {
    constructor(db) {
        this.db = db;
    }

    get(req, res) {
        this.db.collection('Forms').find({}).toArray((err, result) => {
            if (err) throw err;
            let forms = result.map(form => form);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(forms));
        });   
    }

    post(req, res) {
        if (!csrfCheck(req.headers['csrf-token'], res)) {
            return;
        }
        this.db.collection('Forms').insertOne({title: req.body.title, fields: req.body.fields}, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });    
    }

    delete(req, res) {
        if (!csrfCheck(req.headers['csrf-token'], res)) {
            return;
        }
        this.db.collection('Forms').deleteOne({title: req.body.title}, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    }

    put(req, res) {
        if (!csrfCheck(req.headers['csrf-token'], res)) {
            return;
        }
        const query         = { title: req.body.title };
        const updatedValues = { fields: req.body.fields, title: req.body.newTitle };

        this.db.collection('Forms').updateOne(query, updatedValues, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });     
    }
};