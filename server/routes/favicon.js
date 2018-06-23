const fs           = require('fs');
const multer       = require('multer');
const storage      = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/../../dist/');
    },
    filename: (req, file, cb) => {
        cb(null, 'favicon.png');
    }
});
const upload = multer({storage: storage}).single('file');

module.exports = class Media {
    constructor(db) {
        this.db = db;
    }

    post(req, res) {
       upload(req, res, err => {
            if (err) throw err;
            fs.writeFile(`${__dirname}/../../dist/favicon.ico`, '', (err) => {
                if (err) throw err;
                return res.sendStatus(200);
            });
        }); 
    }
};