import { ExportDefinition } from "./exportDefinition";
import { ExportWriter } from "../writers/exportWriter";
import { Opts } from '../opts/optsLoader';
const postgres = require('postgres');

export async function runExports(exportDefs: ExportDefinition[], writer: ExportWriter, opts: Opts): Promise<void> {
    await writer.init();
    const sql = postgres({
        ...opts.sqlDbConfig
    });

    try {
        for (const exportDef of exportDefs) {
            await runExport(sql, exportDef, writer, opts);
        }
    } catch (error) {
        throw error;
    } finally {
        await writer.close();
        await sql.end({ timeout: 5 });
    }
}

async function runExport(sql: any, exportDef: ExportDefinition, writer: ExportWriter, opts: Opts): Promise<void> {
    await sql.unsafe(exportDef.sqlQuery).cursor(2000, async (rows: any) => {
        if (exportDef.beforeEach) { await exportDef.beforeEach(rows); }
        await writer.write(rows, opts);
        if (exportDef.afterEach) { await exportDef.afterEach(); }
    })
}
