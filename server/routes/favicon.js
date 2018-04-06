const fs           = require('fs');
const multer       = require('multer');
const csrfCheck    = require('./csrf-token-check');
const storage      = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/../../dist/');
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
       upload(req, res, err => {
            if (!csrfCheck(req.body.csrf, res)) {
                return;
            }
            if (err) throw err;
            fs.writeFile(`${__dirname}/../../dist/favicon.ico`, '', (err) => {
                if (err) throw err;
            });
        }); 
    }
};