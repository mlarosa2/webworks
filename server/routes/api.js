const express      = require('express');
const router       = express.Router();
const mongo        = require('mongodb').MongoClient;
const mongoConnect = require('../secrets').mongo;

mongo.connect(mongoConnect, (err, db) => {
    router.get('/', (req, res) => {
        res.send('test api');
    });

    router.route('/login')
        .post((req, res) => {
            db.collection('Users').find({ name: req.body.username }).toArray((err, result) => {
                if (err) throw err;
                if (result.length > 0 && req.body.password === result[0].password) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(401);
                }
            });
        });

    router.route('/pages')
        .get((req, res) => {
            db.collection('Pages').find({}).toArray((err, result) => {
                if (err) throw err;
                let titles = result.map(page => page.title);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(titles));
            });
        })
        .post((req, res) => {
            db.collection('Pages').insertOne({title: req.body.title, body: req.body.body}, (err, result) => {
                if (err) throw err;
                res.sendStatus(200);
            });
        });
    
    router.route('/page/:title')
        .get((req, res) => {
            db.collection('Pages').find({title: req.params.title}).toArray((err, result) => {
                if (err) throw err;
                if (result.length === 1) {
                    res.send(result[0].body);
                } else {
                    res.sendStatus(404);
                }
            })
        });
});

module.exports = router;