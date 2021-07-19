import { readdirSync } from "fs";
import path from "path";

export interface Args {
    _: string[];
    path?: string;
    config?: string;
    'dry-run'?: boolean;
    'before-all'?: boolean;
    'after-all'?: boolean;
}

export interface Opts {
    exportDefsFilePaths: string[];
    dryRun: boolean;
    beforeAllFilePath?: string;
    afterAllFilePath?: string;
    sqlDbConfig: SqlConfig;
    mongoDbConfig?: MongoConfig
}

export interface SqlConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export interface MongoConfig {
    connectionString: string;
    dbName: string;
}
export interface ConfigFile {
    exportsDirPath: string;
    sqlDbConfig: SqlConfig;
    mongoDbConfig: MongoConfig
}

export function loadOptsFromConfig(args: Args): Opts {
    const configFilePath = path.resolve(args.config || './s2m.config.js');
    let config: ConfigFile;

    try {
        config = require(configFilePath) || {};

    } catch (error) {
        if (error.code === 'MODULE_NOT_FOUND') {
            throw new Error(`Error loading config file: ${configFilePath}`);
        } else {
            throw error;
        }
    }
    const { sqlDbConfig, mongoDbConfig } = config;
    const exportsDirPath = path.resolve(args.path || config.exportsDirPath);

    if (!sqlDbConfig) { throw new Error('sqlDbConfig is required'); }

    const dryRun = args['dry-run'] || false;
    if (!mongoDbConfig && !dryRun) { throw new Error('mongoDbConfig is required'); }

    let beforeAllFilePath: string | undefined = path.join(exportsDirPath, 'beforeAll.js');
    let afterAllFilePath: string | undefined = path.join(exportsDirPath, 'afterAll.js');

    // if file paths were provided as cli args,  beforeAll and afterAll hooks won't run
    // by default unless explicitly specified 
    //
    // if its a dry run, we don't want to run the beforeAll and afterAll hooks
    if ((!args['before-all'] && args._.length > 0) || dryRun) { beforeAllFilePath = undefined; }
    if ((!args['after-all'] && args._.length > 0) || dryRun) { afterAllFilePath = undefined; }

    const exportDefsFilePaths = args._.length > 0 ?
        args._.map(filePath => path.resolve(filePath)) : getExportDefFilePathsOfDir(exportsDirPath);

    if (!exportDefsFilePaths || !exportDefsFilePaths.length) {
        throw new Error('No export definition files were specified');
    }

    return {
        exportDefsFilePaths,
        dryRun,
        beforeAllFilePath,
        afterAllFilePath,
        sqlDbConfig,
        mongoDbConfig
    };
}

function getExportDefFilePathsOfDir(dirPath: string | undefined): string[] {
    if (!dirPath) { return []; }
    try {
        return readdirSync(dirPath)
            .filter(fileName => !(fileName === 'beforeAll.js' || fileName === 'afterAll.js'))
            .map(fileName => path.join(dirPath, fileName));
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error(`Directory ${dirPath} does not exist`);
        } else {
            throw error;
        }
    }
}