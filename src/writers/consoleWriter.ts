import { ExportWriter } from "./exportWriter";

export class ConsoleWriter implements ExportWriter {
    async init(): Promise<void> {
    }
    async write(data: any, opts: any): Promise<void> {
        for (const datum of data) {
            console.log(datum);
        }
    }
    async close(): Promise<void> {
    }
}