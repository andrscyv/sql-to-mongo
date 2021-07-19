import { Opts } from "../opts/optsLoader";
import { ExportReader } from "./exportReader";
import { PostgresReader } from "./postgresReader";

export function buildReader(opts: Opts): ExportReader {
    const { sqlDbConfig } = opts;
    return new PostgresReader(sqlDbConfig);
}