const csrfCheck = require('./csrf-token-check');

module.exports = class Templates {
    constructor(db) {
        this.db = db;
    }

    get(req, res) {
        this.db.collection('Templates').find({}).toArray((err, result) => {
            if (err) throw err;
            
            let templates = result.map(template => template);
            
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(templates));
        });
    }

    post(req, res) {
        if (!csrfCheck(req.body.csrf, res)) {
            return;
        }

        this.db.collection('Templates').insertOne({title: req.body.title, body: req.body.body}, (err, result) => {
            if (err) throw err;
            
            res.sendStatus(200);
        });      
    }

    put(req, res) {
        if (!csrfCheck(req.body.csrf, res)) {
            return;
        }
        const query = { title: req.body.title};
        let title   = req.body.newTitle || req.body.title;
        const updatedValues = { title: title, body: req.body.body };

       this.db.collection('Templates').updateOne(query, updatedValues, (err, result) => {
            if (err) throw err;
            
            res.sendStatus(200);
        });
    }
};