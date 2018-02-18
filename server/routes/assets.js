const fs = require('fs');

module.exports = class Assets {
    constructor(db) {
        this.db = db;
    }

    get(req, res) {
        this.db.collection('Assets').find({}).toArray((err, result) => {
            if (err) throw err;
            let assets = result.map(asset => asset);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(assets));
        });
    }

    post(req, res) {
        this.db.collection('Assets').insertOne({title: req.body.title, type: req.body.type, body: req.body.body}, (err, result) => {
            if (err) throw err;
            let file = Assets._getfilePath(req.body.type, req.body.title);
            fs.writeFile(file, req.body.body, (err, success) => {
                if (err) throw err;
                res.sendStatus(200);
            });
        });      
    }

    put(req, res) {
        const query = { title: req.body.title, type: req.body.type};
        let title   = req.body.newTitle || req.body.title;
        let type    = req.body.newType || req.body.type;
        const updatedValues = { title: title, type: type, body: req.body.body};

       this.db.collection('Assets').updateOne(query, updatedValues, (err, result) => {
            if (err) throw err;
            let file = Assets._getfilePath(req.body.type, req.body.title);
            fs.unlink(file, (err, success) => {
                if (err) {
                    let restore = Assets._getfilePath(req.body.type, req.body.title);
                    fs.writeFile(restore, req.body.body, (err, success) => {
                        if (err) throw err;
                    });
                } else {
                    let file = Assets._getfilePath(type, title);
                    fs.writeFile(file, req.body.body, (err, success) => {
                        if (err) throw err;
                        res.sendStatus(200);
                    });
                }
            });
        });
    }

    static _getfilePath(type, title) {
        let file = __dirname + '/../../assets/',
            css  = type === 'css';
        if (css) {
            file += 'css/';
        } else {
            file += 'js/';
        }
        file += title;
        if (css) {
            file += '.css';
        } else {
            file += '.js';
        }

        return file;
    }
};