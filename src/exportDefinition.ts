import sql from './sqlDb';
import { createMongoClient } from './mongoDb';

export class ExportDefinition {

    constructor(
        public collectionName: string,
        public sqlQuery: string,
        public beforeInsert?: Function,
        public afterInsert?: Function
        ) {}

    async run(): Promise<void> {
        const mongo = createMongoClient();
        await mongo.connect()

        try {
            await sql.unsafe(this.sqlQuery).cursor(2000, async (rows: any) => {
                if (this.beforeInsert) { await this.beforeInsert(rows); }
                console.log(rows)
                await mongo.db(process.env.MONGO_DB_NAME).collection(this.collectionName).insertMany(rows);
                if (this.afterInsert) { await this.afterInsert(); }
            }) 
        } catch (error) {
            throw error;
        } finally {
            await mongo.close();
        }

    }
}