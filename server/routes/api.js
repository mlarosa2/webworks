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
                if (result.length !== 0 && req.body.password === result[0].password) {
                    res.sendStatus(200);
                } else {
                    res.status(401).send('Invalid Credentials');
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
            
        });
});

module.exports = router;