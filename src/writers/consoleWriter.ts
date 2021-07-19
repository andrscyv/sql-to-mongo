import { ExportDefinition } from "../exports/exportDefinition";
import { ExportWriter } from "./exportWriter";

export class ConsoleWriter implements ExportWriter {
    async init(): Promise<void> {
    }
    async write(data: any, exportDef: ExportDefinition): Promise<void> {
        for (const datum of data) {
            console.log(datum);
        }
    }
    async close(): Promise<void> {
    }
}