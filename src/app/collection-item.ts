export class CollectionItem {
    constructor(
        private title: string,
        private fields: any,
        private belongsTo: string,
        public csrf?: string
    ) { }

    setBelongsTo(name: string): void {
        this.belongsTo = name;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    setFields(fields: any): void {
        this.fields = fields;
    }

    getTitle(): string {
        return this.title;
    }

    getFields(): string[] {
        return this.fields;
    }
}
