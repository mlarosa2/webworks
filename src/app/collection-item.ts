export class CollectionItem {
    constructor(
        public title: string,
        public fields: any,
        public belongsTo: string
    ) { }

    setBelongsTo(name: string): void {
        this.belongsTo = name;
    }
}
