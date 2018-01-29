const PageParser = require('./page-parser');

const parse = page => {
    const pageParser = new PageParser(page);

    return pageParser.getParsedPage();
};

module.exports = parse;