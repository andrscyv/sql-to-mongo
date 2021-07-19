import postgres from "postgres";
import { ExportDefinition } from "../exports/exportDefinition";
import { SqlConfig } from "../opts/optsLoader";
import { ExportWriter } from "../writers/exportWriter";
import { ExportReader } from "./exportReader";

export class PostgresReader implements ExportReader {
    private sql: any;

    constructor(private sqlDbConfig: SqlConfig) { }

    async init(): Promise<void> {
        this.sql = postgres({ ...this.sqlDbConfig });
    }

    async close(): Promise<void> {
        await this.sql.end({ timeout: 5 });
    }
    async pipeToWriter(writer: ExportWriter, exportDef: ExportDefinition): Promise<void> {
        await this.sql.unsafe(exportDef.sqlQuery).cursor(2000, async (rows: any) => {
            await writer.write(rows, exportDef);
        })
    }
}