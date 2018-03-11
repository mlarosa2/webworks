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

module.exports = class Media {
    constructor(db) {
        this.db = db;
    }

    post(req, res) {
        if (!csrfCheck(req.headers['csrf-token'], res)) {
            return;
        }
       upload(req, res, err => {
            if (err) throw err;
            fs.writeFile(`${__dirname}/../../meta-media/${Date.now()}-${req.file.originalname}`, '', (err) => {
                if (err) throw err;
                this.db.collection('Media').insertOne({title: req.file.originalname}, (err, result) => {
                    if (err) throw err
                    return res.sendStatus(200);
                });
            });
        }); 
    }

    get(req, res) {
        const mediaDir = __dirname + '/../../meta-media/';
        fs.readdir(mediaDir, (err, files) => {
            const allFiles = files.map((file) => { return file.substr(file.indexOf('-') + 1) });                
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(allFiles.reverse()));
        });   
    }
};