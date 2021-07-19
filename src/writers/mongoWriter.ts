import { MongoClient } from 'mongodb';
import { ExportDefinition } from '../exports/exportDefinition';

import { ExportWriter } from "./exportWriter";

export class MongoWriter implements ExportWriter{
    private client: MongoClient;

    constructor(connectionString: string , public dbName: string) {
        if (!connectionString) { throw new Error('MONGO_CONNECTION_STRING is not set'); }
        this.client = new MongoClient(connectionString);
    }

    async init(): Promise<void> {
        await this.client.connect();
    }
    async write(data: any, exportDef: ExportDefinition): Promise<void> {
        const { collectionName } = exportDef;
        await this.client.db(this.dbName).collection(collectionName).insertMany(data);
    }
    async close(): Promise<void> {
        await this.client.close();
    }
}