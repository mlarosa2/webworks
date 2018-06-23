module.exports = class GlobalAssets {
    constructor(db) {
        this.db = db;
    }

    get(req, res) {
        this.db.collection('GlobalAssets').find({}).toArray((err, result) => {
            if (err) throw err;
            let globals = result.map(worldwide => worldwide);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(globals));
        });
    }

    post(req, res) {
        const db = this.db;
        this.db.collection('GlobalAssets').insertOne({title: req.body.title, type: req.body.type}, (err, result) => {
            if (err) throw err;
            GlobalAssets.updateAsset(req.body.title, req.body.type, true, db, res);
        });      
    }

    delete(req, res) {

        const db = this.db;
        this.db.collection('GlobalAssets').deleteOne({title: req.params.title, type: req.params.type}, (err, result) => {
            if (err) throw err;
            GlobalAssets.updateAsset(req.params.title, req.params.type, false, db, res);
        });      
    }

    static updateAsset(title, type, worldwide, db, res) {
        const query = { title: title, type: type};

        db.collection('Assets').updateOne(query, {$set: {global: worldwide}}, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    }
};