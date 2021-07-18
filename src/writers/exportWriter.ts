export interface ExportWriter {
    init(): Promise<void>;
    write(data:any , opts: any): Promise<void>;
    close(): Promise<void>;
}