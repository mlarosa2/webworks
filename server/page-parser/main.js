const PageParser = require('./page-parser');

const parse = page => {
    const pageParser = new PageParser(page);

    return new Promise((resolve, reject) => {
        pageParser.getParsedPage().then(res => {
            resolve(res);
        });
    },
    err => err);
};

module.exports = parse;