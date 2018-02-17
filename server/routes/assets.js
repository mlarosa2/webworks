const fs = require('fs');

module.exports = class Assets {
    constructor(db) {
        this.db = db;
    }

    get(req, res) {
        this.db.collection('Assets').find({}).toArray((err, result) => {
            if (err) throw err;
            let titles = result.map(asset => asset.title);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(titles));
        });
    }

    post(req, res) {
        this.db.collection('Assets').insertOne({title: req.body.title, type: req.body.type, body: req.body.body}, (err, result) => {
            if (err) throw err;
            let file = __dirname + '/../../assets/',
                css  = req.body.type === 'css';
            if (css) {
                file += 'css/';
            } else {
                file += 'js/';
            }
            file += req.body.title;
            if (css) {
                file += '.css';
            } else {
                file += '.js';
            }
            fs.writeFile(file, req.body.body, (err, success) => {
                if (err) throw err;
                res.sendStatus(200);
            });
        });      
    }

    delete(req, res) {
        this.db.collection('Assets').deleteOne({title: req.body.title, type: req.body.type}, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    }

    put(req, res) {
        const query = { title: req.body.title, type: req.body.type};
        const updatedValues = { type: req.body.newType, title: req.body.newTitle, body: req.body.body};

       this.db.collection('Assets').updateOne(query, updatedValues, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    }
};