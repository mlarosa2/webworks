module.exports = class ComponentParser {
    constructor(component) {
        this.component = component;
        this.parsedComponent = '';
        this.formId = '';
        this.init();
    }

    init() {
        if (this.component.hasOwnProperty('belongsTo')) {
            this.parseCollection();
        } else {
            this.formId = this.component.title.split(' ').map(word => word.toLowerCase()).join('-');
            this.parseForm();
        }
    }

    parseCollection() {
        for (let field in this.component.fields) {
            if (this.component.fields.hasOwnProperty(field)) {
                this.parsedComponent += this.component.fields[field];
            }
        }
    }

    parseForm() {
        this.parsedComponent += `<form id="${this.formId}">`;
        
        for (let field in this.component.fields) {
            if (this.component.fields.hasOwnProperty(field)) {
                this.parsedComponent += this.parseFormComponent(this.component.fields[field]);
            }
        }
    }

    getParsedComponent() {
        return this.parsedComponent;
    }

    parseFormComponent(element) {
        let parsedEle = '';

        parsedEle += this.getFirstPartOfElement(element.type);
        parsedEle += this.getComponentAttributes(element.options);
        parsedEle += this.getComponentUserOptions(element.options.userOptions, element.type);
    }

    getFirstPartOfElement(type) {
        let parsedEle = '';
        switch (type) {
            case 'textArea': 
                parsedEle += '<textarea '
                break;
            case 'text':
                parsedEle += '<input type="text" ';
                break;
            case 'radio':
                parsedEle += '<input type="radio" ';
                break;
            case 'checkmarks':
                parsedEle += '<input type="checkbox" ';
                break;
            case 'select':
                parsedEle += '<input type="select" ';
                break;
            default:
                break;
        }

        return parsedEle;
    }

    getComponentAttributes(options) {
        let parsedEle = '';
        
        if (options.placeholder) {
            parsedEle += `placeholder="${options.placeholder}" `;
        }

        if (options.name) {
            parsedEle += `name="${options.name}"`;
        }

        parsedEle += '>';

        return parsedEle;
    }
    
    getComponentUserOptions(userOptions, type) {
        let parsedEle = '';
    }

    makeCheckbox(value, checkboxGroup) {
        return `<input id="${value + checkboxGroup}" type="checkbox" name="${checkboxGroup}" value="${value}"><label for="${value + checkboxGroup}">${value}</label>`;
    }

    makeRadio(value, radioGroup) {
        return `<input id="${value + radioGroup}" type="radio" name="${radioGroup}" value="${value}"><label for="${value + radioGroup}">${value}</label>`;
    }

    makeSelectOption(name) {
        return `<option value="${name}">${name}</option>`;
    }
}