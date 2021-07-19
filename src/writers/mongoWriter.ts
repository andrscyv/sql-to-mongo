import { MongoClient } from 'mongodb';

import { ExportWriter } from "./exportWriter";

export class MongoWriter implements ExportWriter{
    private client: MongoClient;

    constructor({ connectionString }: { connectionString: string | undefined }) {
        if (!connectionString) { throw new Error('MONGO_CONNECTION_STRING is not set'); }
        this.client = new MongoClient(connectionString);
    }

    async init(): Promise<void> {
        await this.client.connect();
    }
    async write(data: any, opts: any): Promise<void> {
        const { dbName, collectionName } = opts;
        await this.client.db(dbName).collection(collectionName).insertMany(data);
    }
    async close(): Promise<void> {
        await this.client.close();
    }
}