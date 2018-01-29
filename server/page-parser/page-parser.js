const mongo           = require('mongodb').MongoClient;
const mongoConnect    = require('../secrets').mongo;
const ComponentParser = require('./component-parser');

module.exports = class PageParser {
    constructor(page) {
        this.page = page;
        this.init();
    }

    init() {
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
                });
            },
            err => err);
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

    getParsedPage() {
        return this.page;
    }

    processComponents(components) {
        return components.map(component => {
            return component.toArray();
        });
    }

    constructFullPageBody(processedComponents, preProcessedComponents) {
        preProcessedComponents.forEach(pre => {
            
        });
    }

    getComponentType(component) {
        return component.match(/type="(.+?)"/)[1];
    }

    getComponentName(component) {
        return component.match(/title="(.+?)"/)[1];
    }
}