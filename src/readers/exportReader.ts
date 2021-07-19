import { ExportDefinition } from "../exports/exportDefinition";
import { Opts } from "../opts/optsLoader";
import { ExportWriter } from "../writers/exportWriter";

export interface ExportReader {
    init(): Promise<void>;
    close(): Promise<void>;
    pipeToWriter(writer: ExportWriter, exportDef: ExportDefinition): Promise<void>;
}