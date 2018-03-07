module.exports = class GlobalAssets {
    constructor(db) {
        this.db = db;
    }

    post(req, res) {
        this.db.collection('GlobalAssets').insertOne({title: req.body.title, type: req.body.type}, (err, result) => {
            if (err) throw err;
            GlobalAssets.updateAsset(req.body.title, req.body.type, true);
        });      
    }

    post(req, res) {
        this.db.collection('GlobalAssets').deleteOne({title: req.params.title, type: req.params.type}, (err, result) => {
            if (err) throw err;
            GlobalAssets.updateAsset(req.params.title, req.params.type, false);
        });      
    }

    static updateAsset(title, type, worldwide) {
        const query = { title: title, type: type};
        this.db.collection('Assets').updateOne(query, {global: worldwide}, (err, result) => {
            if (err) throw err;
            res.send(200);
        });
    }
};