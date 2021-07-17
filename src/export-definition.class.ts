export class ExportDefinition {
    collectionName?: string;
    sqlQuery?: string;
    beforeInsert?: Function;
    afterInsert?: Function;

    async run(): Promise<void> {
        await this.runSqlQuery();

        if (this.afterInsert) { await this.afterInsert(); }
        
        return
    }

    private runSqlQuery(): void {
        return
    }
}