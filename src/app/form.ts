export class Form {
    constructor(
        public title: string,
        public fields: object[],
        public csrf?: string
    ) { }
}
