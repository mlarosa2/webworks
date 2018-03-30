const express      = require('express');
const router       = express.Router();
const mongo        = require('mongodb').MongoClient;
const mongoConnect = require('../secrets').mongo;
// include REST route classes
const Login                 = require('./login');
const Signup                = require('./signup');
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
const GlobalAssets          = require('./global-assets');
const SubmitForm            = require('./submit-form');
const FormResponses         = require('./form-responses');
const SingleFormResponse    = require('./form-response');
const Templates             = require('./templates');
const SingleTemplate        = require('./single-template');

mongo.connect(mongoConnect, (err, db) => {
    const login                 = new Login(db); // /login
    const signup                = new Signup(db) // /signup
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
    const globalAssets          = new GlobalAssets(db); // /global-assets
    const submitForm            = new SubmitForm(db); // /submit-form
    const formResponses         = new FormResponses(db); //form-responses/:belongsTo
    const singleFormResponse    = new SingleFormResponse(db); //form-response/:belongsTo/:title
    const templates             = new Templates(db) // templates
    const singleTemplate        = new SingleTemplate(db) // template/:title
    
    router.route('/login') // handles sign out too
        .post(login.post.bind(login)) // binding so this context is consistent in class
        .delete(login.delete.bind(login));
    
    router.route('/login/fe')   
        .post(login.postFe.bind(login)) // when checking login from cookie

    router.route('/signup')
        .post(signup.post.bind(signup));

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
        .put(assets.put.bind(assets));
    
    router.route('/asset/:title/:type')
        .get(singleAsset.get.bind(singleAsset))
        .delete(singleAsset.delete.bind(singleAsset));

    router.route('/global-assets')
        .get(globalAssets.get.bind(globalAssets))
        .post(globalAssets.post.bind(globalAssets));
    
    router.route('/global-assets/:title/:type')
        .delete(globalAssets.delete.bind(globalAssets));

    router.route('/submit-form')
        .post(submitForm.post.bind(submitForm));

    router.route('/form-responses/:belongsTo')
        .get(formResponses.get.bind(formResponses));

    router.route('/form-response/:belongsTo/:mongoId')
        .get(singleFormResponse.get.bind(singleFormResponse))
        .delete(singleFormResponse.delete.bind(singleFormResponse));

    router.route('/templates')
        .get(templates.get.bind(templates))
        .post(templates.post.bind(templates))
        .put(templates.put.bind(templates));
    
    router.route('/template/:title')
        .get(singleTemplate.get.bind(singleTemplate))
        .delete(singleTemplate.delete.bind(singleTemplate));
});

module.exports = router;