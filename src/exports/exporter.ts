import { ExportDefinition } from "./exportDefinition";
import { ExportWriter } from "../writers/exportWriter";
import { Opts } from '../opts/optsLoader';
import { ExportReader } from "../readers/exportReader";
const postgres = require('postgres');

export async function runExports(exportDefs: ExportDefinition[], writer: ExportWriter, reader: ExportReader): Promise<void> {
    await writer.init();
    await reader.init();
    try {
        for (const exportDef of exportDefs) {
            await reader.pipeToWriter(writer, exportDef);
        }
    } catch (error) {
        throw error;
    } finally {
        await writer.close();
        await reader.close();
    }
}
