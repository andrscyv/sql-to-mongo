import { ExportDefinition } from './exports/exportDefinition';
import { loadExportDefs } from './exports/exportDefLoader';
import { runExports } from './exports/exporter';
import { ExportWriter } from './writers/exportWriter';
import sql from './sqlDb';
import { ConsoleWriter } from './writers/consoleWriter';



async function main():Promise<void> {
   const exportDefs: ExportDefinition[] = await loadExportDefs(['test.sql']);
   let opts;
   const writer = new ConsoleWriter();
   await runExports(exportDefs, writer, opts);
   await sql.end({ timeout: 5 });
   process.exit(0);
}

// function getWriter(opts:any): ExportWriter {
//    return null;
// }
main().catch(err => console.error(err));