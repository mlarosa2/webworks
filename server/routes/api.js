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

// include REST route classes
const Login                 = require('./login');
const Pages                 = require('./pages');
const SinglePage            = require('./single-page');
const Media                 = require('./media');
const SingleMedia           = require('./single-media');
const Collections           = require('./collections');
const SingleCollection      = require('./single-collection');
const Forms                 = require('./forms');
const SingleForm            = require('./single-form');
const CollectionItems       = require('./collection-items');
const SingleCollectionItems = require('./single-collection-items');
const CollectionItem        = require('./collection-item');
const Assets                = require('./assets');
const SingleAsset           = require('./single-asset');

mongo.connect(mongoConnect, (err, db) => {
    const login                 = new Login(db); // /login
    const pages                 = new Pages(db); // /pages
    const singlePage            = new SinglePage(db); // /page/:title
    const media                 = new Media(db); // /media
    const singleMedia           = new SingleMedia(db); // /media/:title
    const collections           = new Collections(db); // /collections
    const singleCollection      = new SingleCollection(db); // /collection/:title
    const Forms                 = new Forms(db); // /forms
    const singleForm            = new SingleForm(db); // /form/:title
    const collectionItems       = new CollectionItems(db); // /collection-items
    const singleCollectionItems = new SingleCollectionItems(db); // /collection-items/:belongsTo
    const collectionItem        = new CollectionItem(db); // /collection-item/:belongsTo/:title
    const assets                = new Assets(db); // /assets
    const SingleAsset           = new SingleAsset(db); // /asset 

    router.route('/login')
        .post(login.post.bind(login)); // binding so this context is consistent in class

    router.route('/pages')
        .get(pages.get.bind(pages))
        .post(pages.post.bind(pages));
    
    router.route('/page/:title')
        .get(singlePage.get.bind(singlePage))
        .delete(singlePage.delete.bind(singlePage))
        .put(singlePage.put.bind(singlePage));

    router.route('/media')
        .post(media.post.bind(media))
        .get(media.get.bind(media));

    router.route('/media/:title')
        .get(singleMedia.get.bind(this))
        .delete(singleMedia.delete.bind(this))
        .put(singleMedia.put.bind(this));

    router.route('/collections')
        .get(collections.get.bind(this))
        .post(collections.post.bind(this))
        .delete(collections.delete.bind(this))
        .put(collections.put.bind(this));
    
    router.route('/collection/:title')
        .get(singleCollection.get.bind(this));

    router.route('/forms')
        .get(forms.get.bind(this))
        .post(forms.post.bind(this))
        .delete(forms.delete.bind(this))
        .put(forms.put.bind(this));
    
    router.route('/form/:title')
        .get(singleForm.get.bind(this));

    router.route('/collection-items')
        .post(collectionItems.post.bind(this))
        .delete(collectionItems.delete.bind(this))
        .put(collectionItems.put.bind(this));

    router.route('/collection-items/:belongsTo')
        .get(singleCollectionItems.get.bind(this));
    
    router.route('/collection-items/:belongsTo/:title')
        .get(collectionItem.get.bind(this));
    
    router.route('/assets')
        .get(assets.get.bind(this))
        .post(assets.post.bind(this))
         .delete(assets.delete.bind(this))
        .put(assets.put.bind(this));
    
    router.route('/asset/')
        .get(singleAsset.get.bind(this));
});

module.exports = router;