const fs        = require('fs');

module.exports = class SingleAsset {
    constructor(db) {
        this.db = db;
    }

    get(req, res) {
        this.db.collection('Assets').find({title: req.params.title, type: req.params.type}).toArray((err, result) => {
            if (err) throw err;
            if (result.length === 1) {
                res.send(result[0]);
            } else {
                res.sendStatus(404);
            }
        });
    }

    delete(req, res) {
        this.db.collection('Assets').deleteOne({title: req.params.title, type: req.params.type}, (err, result) => {
            if (err) throw err;
            this.db.collection('GlobalAssets').deleteOne({title: req.params.title, type: req.params.type}, (err, result) => {
                if (err) throw err;
            });
            let file = SingleAsset._getfilePath(req.params.type, req.params.title);
            fs.unlink(file, (err, success) => {
                if (err) throw err;
                res.sendStatus(200);
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