import { ExportDefinition } from "../exports/exportDefinition";

export interface ExportWriter {
    init(): Promise<void>;
    write(data:any , exportDef: ExportDefinition): Promise<void>;
    close(): Promise<void>;
}