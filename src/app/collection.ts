export class Collection {
    constructor(
        public title: string,
        public fields: string[],
        public csrf?: string
    ) { }
}
