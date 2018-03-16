const fs           = require('fs');
const multer       = require('multer');
const csrfCheck    = require('./csrf-token-check');
const storage      = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/../../media/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage}).single('file');

module.exports = class SingleMedia {
    constructor(db) {
        this.db = db;
    }

    get(req, res) {
        this.db.collection('Media').find({title: req.params.title}).toArray((err, result) => {
            if (err) throw err;
            if (result.length === 1) {
                res.send(result[0].body);
            } else {
                res.sendStatus(404);
            }
        });
    }

    delete(req, res) {
        if (!csrfCheck(req.body.csrf, res)) {
            return;
        }
        const metaDir  = __dirname + '/../../meta-media/';
        const mediaDir = __dirname + '/../../media/'; 
        this.db.collection('Media').deleteOne({title: req.params.title}, (err, result) => {
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
    }

    put(req, res) {
        if (!csrfCheck(req.body.csrf, res)) {
            return;
        }
        const metaDir  = __dirname + '/../../meta-media/';
        const mediaDir = __dirname + '/../../media/'; 
        const query         = { title: req.params.title };
        const updatedValues = { title: req.body.updateTitle }; 
        this.db.collection('Media').updateOne(query, updatedValues, (err, result) => {
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
    }
};