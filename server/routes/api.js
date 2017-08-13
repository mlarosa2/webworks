const express      = require('express');
const router       = express.Router();
const mongo        = require('mongodb').MongoClient;
const mongoConnect = require('../secrets').mongo;
const multer       = require('multer');
const storage      = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/../media/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({storage: storage}).single('file');

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
            });console.log(upload);
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
        })
        .delete((req, res) => {
            db.collection('Pages').deleteOne({title: req.params.title}, (err, result) => {
                if (err) console.log(err);
                res.sendStatus(200);
            });
        })
        .put((req, res) => {
            const query         = { title: req.params.title };
            const updatedValues = req.body.body; 
            db.collection('Pages').updateOne(query, updatedValues, (err, result) => {
                if (err) throw err;
                res.sendStatus(200);
            });
        });

    router.route('/media')
        .post((req, res) => {
            let path = '';
            upload(req, res, err => {
                if (err) res.sendStatus(422);
                path = req.file.path;
                return res.sendStatus(200);
            });
        });
});

module.exports = router;