const PageParser   = require('../page-parser/main');
const csrfCheck    = require('./csrf-token-check');

module.exports = class Pages {
    constructor(db) {
        this.db = db;
    }

    get(req, res) {
        this.db.collection('Pages').find({}).toArray((err, result) => {
            if (err) throw err;
            let titles = result.map(page => page.title);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(titles));
        });
    }

    post(req, res) {
        if (!csrfCheck(req.headers['csrf-token'], res)) {
            return;
        }
        PageParser(req.body.body).then(parsedPage => {
            this.db.collection('Pages').insertOne(
                 {  title: req.body.title, 
                    body: req.body.body, 
                    parsed: parsedPage, 
                    css: req.body.css, 
                    js: req.body.js,
                    meta: req.body.meta
                }, (err, result) => {
                if (err) throw err;
                res.sendStatus(200);
            });
        });
    }
};