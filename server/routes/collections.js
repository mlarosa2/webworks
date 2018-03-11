const csrfCheck = require('./csrf-token-check');

module.exports = class Collections {
    constructor(db) {
        this.db = db;
    }

    get(req, res) {
        this.db.collection('Collections').find({}).toArray((err, result) => {
            if (err) throw err;
            let collections = result.map(collection => collection);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(collections));
        });  
    }

    post(req, res) {
        if (!csrfCheck(req.headers['csrf-token'], res)) {
            return;
        }
        this.db.collection('Collections').insertOne({title: req.body.title, fields: req.body.fields}, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });  
    }

    delete(req, res) {
        if (!csrfCheck(req.headers['csrf-token'], res)) {
            return;
        }
        this.db.collection('Collections').deleteOne({title: req.body.title}, (err, result) => {
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

        this.db.collection('Collections').updateOne(query, updatedValues, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        }); 
    }
};