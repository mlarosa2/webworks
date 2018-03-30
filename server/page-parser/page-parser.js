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

                components = this.page.match(/\[\[.+\]\]/g) || [];

                componentPromises = components.map(component => {
                    if (typeof component === 'string') {
                        return this.parseComponent(component, db);
                    }
                });

                Promise.all(componentPromises).then(res => {
                    Promise.all(this.processComponents(res)).then(processedComponents => {
                        const parsedComponents = {};

                        if (processedComponents) {
                            processedComponents.forEach(pc => {
                                const parsedComponent = pc[0];
                                let id, isCollection = parsedComponent.hasOwnProperty('belongsTo'),
                                    isTemplate = parsedComponent.hasOwnProperty('template'),
                                    parser;
                                
                                if (isCollection) {
                                    id = parsedComponent.belongsTo;
                                    id += '_collection';
                                } else if (isTemplate) {
                                    id = parsedComponent.title;
                                    id += '_template';
                                } else {
                                    id = parsedComponent.title;
                                    id += '_form';
                                }

                                if (!isTemplate) {
                                    parser = new ComponentParser(parsedComponent);
                                }

                                if (isCollection) {
                                    if (!parsedComponents[id]) {
                                        parsedComponents[id] = [];
                                    }
                                    parsedComponents[id].push(parser.getParsedComponent());
                                } else if (isTemplate) {
                                    parsedComponents[id] = parsedComponent.body;
                                } else {
                                    parsedComponents[id] = parser.getParsedComponent();
                                }
                            });
                            // filter out meta data from regex result
                            this.constructFullPageBody(parsedComponents, components.filter(comp => typeof comp === 'string'));
                        }
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
        } else if (componentType.toLowerCase() === 'template') {
            return db.collection('Templates').find({title: componentName});
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
            let replaceText = '', regex, escapedPre = '';
            // [ and ] are special chars for regex so need to change them to \[ and \]
            for (let i = 0; i < pre.length; i++) {
                if (pre[i] === '[' || pre[i] === ']') {
                    escapedPre += '\\' + pre[i];
                } else {
                    escapedPre += pre[i];
                }
            }

            if (this.getComponentType(pre) === 'collection') {
                replaceText = processedComponents[preTitle + '_collection'].join('');
            } else if (this.getComponentType(pre) === 'template') {
                replaceText = processedComponents[preTitle + '_template'];
            } else {
                replaceText = processedComponents[preTitle + '_form'];
            }

            regex = new RegExp(escapedPre, 'g');
            this.page = this.page.replace(regex, replaceText);
        });
    }

    getComponentType(component) {
        return component.match(/type="(.+?)"/)[1];
    }

    getComponentName(component) {
        return component.match(/title="(.+?)"/)[1];
    }
}