import { MongoClient } from "mongodb";
import { MongoConfig, Opts } from "./opts/optsLoader";

export async function runBeforeAllHook(opts: Opts) {
    const { beforeAllFilePath, mongoDbConfig } = opts;
    await runMongoHook(beforeAllFilePath, mongoDbConfig);
}

export async function runAfterAllHook(opts: Opts) {
    const { afterAllFilePath, mongoDbConfig } = opts;
    await runMongoHook(afterAllFilePath, mongoDbConfig);
}

async function runMongoHook(hookFilePath: string | undefined, mongoDbConfig: MongoConfig | undefined) {
    if (hookFilePath && mongoDbConfig) {
        try {
            const client = new MongoClient(mongoDbConfig.connectionString);
            await client.connect();
            await require(hookFilePath)(client.db(mongoDbConfig.dbName));
            await client.close();
            console.log(`Running hook: ${hookFilePath}`);

        } catch (error) {
            //if hook file is not found, just ignore it
            if (error.code !== "MODULE_NOT_FOUND") {
                throw error;
            }
        } 
    }
}