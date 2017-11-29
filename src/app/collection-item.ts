export class CollectionItem {
    constructor(
        private title: string,
        private fields: any,
        private belongsTo: string
    ) { }

    setBelongsTo(name: string): void {
        this.belongsTo = name;
    }

    getTitle(): string {
        return this.title;
    }

    getFields(): string[] {
        return this.fields;
    }
}
