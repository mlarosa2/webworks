const express      = require('express');
const router       = express.Router();
const mongo        = require('mongodb').MongoClient;
const mongoConnect = require('../secrets').mongo;
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
    const forms                 = new Forms(db); // /forms
    const singleForm            = new SingleForm(db); // /form/:title
    const collectionItems       = new CollectionItems(db); // /collection-items
    const singleCollectionItems = new SingleCollectionItems(db); // /collection-items/:belongsTo
    const collectionItem        = new CollectionItem(db); // /collection-item/:belongsTo/:title
    const assets                = new Assets(db); // /assets
    const singleAsset           = new SingleAsset(db); // /asset 
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
        .get(singleMedia.get.bind(singleMedia))
        .delete(singleMedia.delete.bind(singleMedia))
        .put(singleMedia.put.bind(singleMedia));

    router.route('/collections')
        .get(collections.get.bind(collections))
        .post(collections.post.bind(collections))
        .delete(collections.delete.bind(collections))
        .put(collections.put.bind(collections));
    
    router.route('/collection/:title')
        .get(singleCollection.get.bind(singleCollection));

    router.route('/forms')
        .get(forms.get.bind(forms))
        .post(forms.post.bind(forms))
        .delete(forms.delete.bind(forms))
        .put(forms.put.bind(forms));
    
    router.route('/form/:title')
        .get(singleForm.get.bind(singleForm));

    router.route('/collection-items')
        .post(collectionItems.post.bind(collectionItems))
        .delete(collectionItems.delete.bind(collectionItems))
        .put(collectionItems.put.bind(collectionItems));

    router.route('/collection-items/:belongsTo')
        .get(singleCollectionItems.get.bind(singleCollectionItems));
    
    router.route('/collection-items/:belongsTo/:title')
        .get(collectionItem.get.bind(collectionItem));
    
    router.route('/assets')
        .get(assets.get.bind(assets))
        .post(assets.post.bind(assets))
         .delete(assets.delete.bind(assets))
        .put(assets.put.bind(assets));
    
    router.route('/asset/:title/:type')
        .get(singleAsset.get.bind(singleAsset));
});

module.exports = router;