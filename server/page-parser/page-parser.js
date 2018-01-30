const mongo           = require('mongodb').MongoClient;
const mongoConnect    = require('../secrets').mongo;
const ComponentParser = require('./component-parser');

module.exports = class PageParser {
    constructor(page) {
        this.page = page;
    }

    getParsedPage() {
        return new Promise((resolve, reject) => {
            mongo.connect(mongoConnect, (err, db) => {
                let components = [],
                    replaceMap = {},
                    componentPromises = [];

                components = this.page.match(/\[\[.+\]\]/);
                componentPromises = components.map(component => {
                    if (typeof component === 'string') {
                        return this.parseComponent(component, db);
                    }
                });

                Promise.all(componentPromises).then(res => {
                    Promise.all(this.processComponents(res)).then(processedComponents => {
                        const parsedComponents = {};
                        
                        processedComponents[0].forEach(pc => {
                            let id = pc.title;
                            if (pc.hasOwnProperty('belongsTo')) {
                                id += '_collection';
                            } else {
                                id += '_form';
                            }
                            const parser = new ComponentParser(pc);
                            
                            parsedComponents[id] = parser.getParsedComponent();
                        });
                        
                        this.constructFullPageBody(parsedComponents, components);
                        resolve(this.page);
                    });
                },
                err => reject(err));
            });
        });
    }

    parseComponent(component, db) {
        const componentName = this.getComponentName(component);
        const componentType = this.getComponentType(component);
        let dbCollection  = '';

        if (componentType.toLowerCase() === 'collection') {
            return db.collection('CollectionItems').find({belongsTo: componentName});
        } else {
            return db.collection('Forms').find({title: componentName});
        }
    }

    processComponents(components) {
        return components.map(component => {
            return component.toArray();
        });
    }

    constructFullPageBody(processedComponents, preProcessedComponents) {
        preProcessedComponents.forEach(pre => {
            const preTitle = this.getComponentName(pre);
            let replaceText = '', regex;

            if (this.getComponentType(pre) === 'collection') {
                replaceText = processedComponents[preTitle + '_collection'];
            } else {
                replaceText = processedComponents[preTitle + '_form'];
            }
            regex = new RegExp(pre, 'g');
            
            this.page.replace(regex, replaceText);
        });
    }

    getComponentType(component) {
        return component.match(/type="(.+?)"/)[1];
    }

    getComponentName(component) {
        return component.match(/title="(.+?)"/)[1];
    }
}