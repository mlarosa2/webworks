import { PageParser } from './page-parser';

const parse = page => {
    pageParser = new PageParser(page);

    return pageParse.getParsedPage();
};

module.exports = parse;