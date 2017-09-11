const express      = require('express');
const router       = express.Router();
const mongo        = require('mongodb').MongoClient;
const mongoConnect = require('../secrets').mongo;
const fs           = require('fs');
const multer       = require('multer');
const storage      = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/../../media/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
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
        })
        .delete((req, res) => {
            db.collection('Pages').deleteOne({title: req.params.title}, (err, result) => {
                if (err) throw err;
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
            upload(req, res, err => {
                if (err) throw err;
                fs.writeFile(`${__dirname}/../../meta-media/${Date.now()}-${req.file.originalname}`, '', (err) => {
                    if (err) throw err;
                    db.collection('Media').insertOne({title: req.file.originalname}, (err, result) => {
                        if (err) throw err
                        return res.sendStatus(200);
                    });
                });
            });
        })
        .get((req, res) => {
            const mediaDir = __dirname + '/../../meta-media/';
            fs.readdir(mediaDir, (err, files) => {
                const allFiles = files.map((file) => { return file.substr(file.indexOf('-') + 1) });                
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(allFiles.reverse()));
            });
        });

    router.route('/media/:title')
        .get((req, res) => {
            db.collection('Media').find({title: req.params.title}).toArray((err, result) => {
                if (err) throw err;
                if (result.length === 1) {
                    res.send(result[0].body);
                } else {
                    res.sendStatus(404);
                }
            });
        })
        .delete((req, res) => {
            const metaDir  = __dirname + '/../../meta-media/';
            const mediaDir = __dirname + '/../../media/'; 
            db.collection('Media').deleteOne({title: req.params.title}, (err, result) => {
                if (err) throw err;
                fs.readdir(metaDir, (err, files) => {
                    if (err) throw err;
                    for (let i = 0; i < files.length; i++) {
                        if (files[i].substr(files[i].indexOf('-') + 1) === req.params.title) {
                            fs.unlink(`${metaDir}${files[i]}`, (err) => {
                                if (err) throw err;
                                fs.unlink(`${mediaDir}${req.params.title}`, (err) => {
                                    if (err) throw err;
                                    res.sendStatus(200);
                                });
                            });
                            break;
                        }
                    };
                });
            });
        })
        .put((req, res) => {
            const metaDir  = __dirname + '/../../meta-media/';
            const mediaDir = __dirname + '/../../media/'; 
            const query         = { title: req.params.title };
            const updatedValues = { title: req.body.updateTitle }; 
            db.collection('Media').updateOne(query, updatedValues, (err, result) => {
                if (err) throw err;
                fs.readdir(metaDir, (err, files) => {
                    if (err) throw err;
                    for (let i = 0; i < files.length; i++) {
                        if (files[i].substr(files[i].indexOf('-') + 1) === req.params.title) {
                            fs.rename(`${metaDir}${files[i]}`, `${metaDir}${files[i].substr(0, files[i].indexOf('-') + 1)}${req.body.updateTitle}`, (err) => {
                                if (err) throw err;
                                fs.rename(`${mediaDir}${req.params.title}`, `${mediaDir}${req.body.updateTitle}`, (err) => {
                                    if (err) throw err;
                                    res.sendStatus(200);
                                });
                            });
                            break;
                        }
                    };
                });
            });
        });

    router.route('/collections')
        .get((req, res) => {
            db.collection('Collections').find({}).toArray((err, result) => {
                if (err) throw err;
                let titles = result.map(collection => collection.title);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(titles));
            });
        })
        .post((req, res) => {
            db.collection('Collections').insertOne({title: req.body.title, fields: req.body.fields}, (err, result) => {
                if (err) throw err;
                res.sendStatus(200);
            });
        })
        .delete((req, res) => {
            db.collection('Collections').deleteOne({title: req.body.title}, (err, result) => {
                if (err) throw err;
                res.sendStatus(200);
            });
        })
        .put((req, res) => {
            const query         = { title: req.body.title };
            const updatedValues = req.body.fields; 
            db.collection('Collections').updateOne(query, updatedValues, (err, result) => {
                if (err) throw err;
                res.sendStatus(200);
            });
        });
    
    router.route('/collections/:title')
        .get((req, res) => {
            db.collection('Collections').find({title: req.params.title}).toArray((err, result) => {
                if (err) throw err;
                if (result.length === 1) {
                    res.send(result[0]);
                } else {
                    res.sendStatus(404);
                }
            });
        });
});

module.exports = router;