import { ExportWriter } from "./exportWriter";

export class ConsoleWriter implements ExportWriter {
    init(): Promise<void> {
        return Promise.resolve();
    }
    write(data: any, opts: any): Promise<void> {
        console.log(data);
        return Promise.resolve();
    }
    close(): Promise<void> {
        return Promise.resolve();
    }
}