import { ExportDefinition } from './exportDefinition';
import { loadExportDefs } from './exportDefLoader';
import sql from './sqlDb';



async function run():Promise<void> {
   const exportDefs: ExportDefinition[] = await loadExportDefs(['test.sql']);
   for (const exportDef of exportDefs) {
       console.log('runnin')
       await exportDef.run();
   }
   await sql.end({ timeout: 5 });
   process.exit(0);
}

run().catch(err => console.error(err));