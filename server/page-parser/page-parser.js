const express      = require('express');
const router       = express.Router();
const mongo        = require('mongodb').MongoClient;

module.exports = class PageParser {
    constructor(page) {
        this.page = page;
        init();
    }

    init() {
        mongo.connect(mongoConnect, (err, db) => {
            let components = [],
                replaceMap = {};

            components = this.page.match(/\[\[.+\]\]/);
            componentPromises = components.map(component => {
                if (typeof component === 'string') {
                    return this.parseComponent(component, db);
                }
            });

            Promise.all(componentPromises).then(res => {
                console.log(res);
                this.constructFullPageBody(this.fullPageBody);
            });
        });
    }

    parseComponent(component, replaceMap, db) {
        const componentName = this.getComponentName(component);
        const componentType = this.getComponentType(component);
        let dbCollection  = '';

        if (componentType.toLowerCase() === 'collection') {
            dbCollection = 'Collections';
        } else {
            dbCollection = 'Forms';
        }

        return db.collection(dbCoollection).find({title: componentName});
    }

  getComponentType(component) {
    return component.match(/type=".+"/)[0];
  }

  getComponentName(component) {
    return component.match(/title=".+"/)[0];
  }
}