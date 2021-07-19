import { readFile } from "fs/promises";
import path from "path";
import { ExportDefinition } from "./exportDefinition";
import { FileType } from "./fileType";

function parseFilePath(filePath: string): { name:string, fileType:FileType } {
    const { name, ext } = path.parse(filePath); 
    let fileType:FileType;

    switch (ext) {
        case '.sql':
            fileType = FileType.SQL;
            break;
        default:
            throw new Error(`Unsupported file type: ${ext}`);
    }

    return { name, fileType };
}
async function loadFromSqlFile(filePath: string, fileName: string): Promise<ExportDefinition> {
    return new ExportDefinition( fileName, await readFile(filePath, 'utf8'));
}

export async function loadExportDefs(filePaths: string[]):Promise<ExportDefinition[]> {
    const exportDefs = filePaths.map( filePath => {
        const { name, fileType } = parseFilePath(filePath);
        switch (fileType) {
            case FileType.SQL:
                return loadFromSqlFile(filePath, name);

            default:
                throw new Error();
        }
    });

    return await Promise.all(exportDefs);
}