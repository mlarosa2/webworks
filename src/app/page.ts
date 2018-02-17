export class Page {
    constructor(
        public title: string,
        public body: string,
        public css: string[],
        public js: string[],
        public meta: any[]
    ) { }
}
