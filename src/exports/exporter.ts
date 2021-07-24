import { ExportDefinition } from "./exportDefinition";
import { ExportWriter } from "../writers/exportWriter";
import { ExportReader } from "../readers/exportReader";
import { Opts } from "../opts/optsLoader";
const ora = require('ora');

export async function runExports(exportDefs: ExportDefinition[], writer: ExportWriter, reader: ExportReader, opts: Opts): Promise<void> {
    const { dryRun } = opts;
    await writer.init();
    await reader.init();
    try {
        for (const exportDef of exportDefs) {
            let numExportedRows = 0;
            const bar = ora({ text: `Exporting ${exportDef.collectionName} ${numExportedRows}`, isSilent : dryRun }).start();
            await reader.read(exportDef, async data => {
                await writer.write(data, exportDef);
                numExportedRows += data.length;
                bar.text = `Exporting ${exportDef.collectionName} ${numExportedRows} rows`;
            });
            bar.succeed(`Exported ${exportDef.collectionName} ${numExportedRows} rows`);
        }
    } catch (error) {
        throw error;
    } finally {
        await writer.close();
        await reader.close();
    }
}
