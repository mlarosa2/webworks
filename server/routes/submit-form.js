const csrfCheck = require('./csrf-token-check');

module.exports = class SubmitForm {
    constructor(db) {
        this.db = db;
    }

    post(req, res) {
        if (!csrfCheck(req.body.wwcsrfformsubmitcheck33254, res)) {
            return;
        }
        delete req.body.wwcsrfformsubmitcheck33254;
        req.body.wwdatesubmitcheck33254 = SubmitForm.createReadableDate();
        req.body.wwreadsubmitcheck33254 = false;

        this.db.collection('FormResponses').insertOne(req.body, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });      
    }

    static createReadableDate() {
        const date = new Date();
        
        return `${SubmitForm.getMonth(date.getMonth())} ${SubmitForm.getDate()}, ${date.getFullYear()}}`;
    }

    static getMonth(month) {
        switch(month) {
            case 0:
                return 'January';
            case 1: 
                return 'February';
            case 2:
                return 'March';
            case 3:
                return 'April';
            case 4:
                return 'May';
            case 5: 
                return 'June';
            case 6:
                return 'July';
            case 7:
                return 'August';
            case 8:
                return 'September';
            case 9:
                return 'October';
            case 10:
                return 'November';
            case 11:
                return 'December';
        }
    }
};
