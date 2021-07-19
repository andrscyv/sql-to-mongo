import { Opts } from "../opts/optsLoader";
import { ConsoleWriter } from "./consoleWriter";
import { MongoWriter } from "./mongoWriter";

export function buildWriter(opts: Opts) {
    if (opts.dryRun) { return new ConsoleWriter(); }
    const { mongoDbConfig } = opts;
    return new MongoWriter({ connectionString : mongoDbConfig?.connectionString });
}