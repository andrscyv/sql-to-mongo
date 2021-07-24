import { ExportDefinition } from "../exports/exportDefinition";
import { Opts } from "../opts/optsLoader";
import { ExportWriter } from "../writers/exportWriter";

export interface ExportReader {
    init(): Promise<void>;
    close(): Promise<void>;
    read(exportDef: ExportDefinition, pipe: PipeCallBack ): Promise<void>;
}

export type PipeCallBack = (data: any) => Promise<void>;