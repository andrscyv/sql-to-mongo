import postgres from "postgres";
import { ExportDefinition } from "../exports/exportDefinition";
import { SqlConfig } from "../opts/optsLoader";
import { ExportWriter } from "../writers/exportWriter";
import { PipeCallBack, ExportReader } from "./exportReader";

export class PostgresReader implements ExportReader {
    private sql: any;

    constructor(private sqlDbConfig: SqlConfig) { }

    async init(): Promise<void> {
        this.sql = postgres({ ...this.sqlDbConfig });
    }

    async close(): Promise<void> {
        await this.sql.end({ timeout: 5 });
    }
    async read(exportDef: ExportDefinition, pipe: PipeCallBack): Promise<void> {
        await this.sql.unsafe(exportDef.sqlQuery).cursor(2000, async (rows: any) => {
            await pipe(rows);
        })
    }
}