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
            this.formId = String(this.component.title).replace(/ /g, '~__~');
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
        this.parsedComponent += `<form class="${this.formId}">`;
        let submitText = this.parsedComponent.submitText || 'Submit';
        
        for (let field in this.component.fields) {
            if (this.component.fields.hasOwnProperty(field)) {
                this.parsedComponent += this.parseFormComponent(this.component.fields[field]);
            }
        }

        this.parsedComponent += `<button id="${this.formId}-submit">${submitText}</button>`;
        this.parsedComponent += '</form>';
    }

    getParsedComponent() {
        return this.parsedComponent;
    }

    parseFormComponent(element) {
        let parsedEle = '';

        parsedEle += this.getFirstPartOfElement(element.type);
        parsedEle += this.getComponentAttributes(element.options, element.type);
        parsedEle += this.getComponentUserOptions(element.options.userOptions, element.type, element.name);
        parsedEle += this.getLastPartOfElement(element.type);

        return parsedEle;
    }

    getFirstPartOfElement(type) {
        let parsedEle = '';
        switch (type) {
            case 'textArea': 
                parsedEle += '<textarea ';
                break;
            case 'text':
                parsedEle += '<input type="text" ';
                break;
            case 'radio':
                parsedEle += '<div class="radio-group>"';
                break;
            case 'checkmarks':
                parsedEle += '<div class="checkbox-group">';
                break;
            case 'select':
                parsedEle += '<select ';
                break;
            default:
                break;
        }

        return parsedEle;
    }

    getLastPartOfElement(type) {
        let parsedEle = '';
        switch (type) {
            case 'textArea': 
                parsedEle += '</textarea>';
                break;
            case 'text':
                parsedEle += '>'
                break;
            case 'radio':
                parsedEle += '</div>';
                break;
            case 'checkmarks':
                parsedEle += '</div>';
                break;
            case 'select':
                parsedEle += '</div>';
                break;
            default:
                break;
        }

        return parsedEle;
    }

    getComponentAttributes(options, type) {
        let parsedEle = '';
        if (type === 'textArea') {
            if (options.name) {
                parsedEle += `name="${options.name}">`;
            } 

           if (options.placeholder) {
                parsedEle += `${options.placeholder}"`;
            }
        } else if (type !== 'checkmarks' && type !== 'radio') {
            if (options.placeholder) {
                parsedEle += `placeholder="${options.placeholder}" `;
            }

            if (options.name) {
                parsedEle += `name="${options.name}"`;
            }
        }

        parsedEle += '>';

        return parsedEle;
    }
    
    getComponentUserOptions(userOptions, type, name) {
        return userOptions.map(option => {
            if (type === 'textArea') {
                return ComponentParser.makeSelectOption(option);
            } else if (type === 'radio') {
                return ComponentParser.makeRadio(option, name);
            } else if (type === 'checkmarks') {
                return ComponentParser.makeCheckbox(option, name);
            }
        }).join('');
    }

    static makeCheckbox(value, checkboxGroup) {
        return `<input id="${value + checkboxGroup}" type="checkbox" name="${checkboxGroup}" value="${value}"><label for="${value + checkboxGroup}">${value}</label>`;
    }

    static makeRadio(value, radioGroup) {
        return `<input id="${value + radioGroup}" type="radio" name="${radioGroup}" value="${value}"><label for="${value + radioGroup}">${value}</label>`;
    }

    static makeSelectOption(value) {
        return `<option value="${value}">${value}</option>`;
    }
}