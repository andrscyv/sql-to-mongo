import { ExportDefinition } from './export-definition.class';

async function loadExportDefs(filenames: string[]):Promise<ExportDefinition[]> {
    return [];
}

async function run():Promise<void> {
   const exportDefs: ExportDefinition[] = await loadExportDefs(['test.sql']);
   for (const exportDef of exportDefs) {
       await exportDef.run();
   }
}