import { MongoClient } from 'mongodb';

const connectionString = process.env.MONGO_CONNECTION_STRING;

export function createMongoClient(){
    if (!connectionString) { throw new Error('MONGO_CONNECTION_STRING is not set'); }
    return new MongoClient(connectionString) 
}