import sql from '../sqlDb';

import { ExportDefinition } from "./exportDefinition";
import { ExportWriter } from "../writers/exportWriter";

export async function runExports(exportDefs: ExportDefinition[], writer: ExportWriter, opts: any): Promise<void> {
    await writer.init();
    for (const exportDef of exportDefs) {
        try {
            await runExport(exportDef, writer, opts);
        } catch (error) {
            throw error;
        } finally {
            await writer.close();
        }
    }
}

async function runExport(exportDef: ExportDefinition, writer: ExportWriter, opts: any): Promise<void> {
    await sql.unsafe(exportDef.sqlQuery).cursor(2000, async (rows: any) => {
        if (exportDef.beforeEach) { await exportDef.beforeEach(rows); }
        await writer.write(rows, opts);
        if (exportDef.afterEach) { await exportDef.afterEach(); }
    }) 
}
