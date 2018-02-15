module.exports = class SingleCollectionItems {
    constructor(db) {
        this.db = db;
    }

    get(req, res) {
        this.db.collection('CollectionItems').find({belongsTo: req.params.belongsTo}).toArray((err, result) => {
            if (err) throw err;
            let collectionItems = result.map(collection => collection.title);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(collectionItems));
        }); 
    }
};