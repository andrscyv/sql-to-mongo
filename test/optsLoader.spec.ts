import path from 'path';
import { Args, loadOptsFromConfig } from '../src/opts/optsLoader';


test('loads opts from ./s2m.config.js without args', () => {
    const testExportsFolderPath = path.resolve('./test_exports');
    const testExport = 't1.sql';
    const opts = loadOptsFromConfig({ _: [] });
    expect(opts).toEqual({
        afterAllFilePath: `${testExportsFolderPath}/afterAll.js`,
        beforeAllFilePath: `${testExportsFolderPath}/beforeAll.js`,
        dryRun: false,
        exportDefsFilePaths: [ `${testExportsFolderPath}/${testExport}`],
        mongoDbConfig: {
            connectionString: 'http://mongo',
            dbName: 'mongoDbName',
        },
        sqlDbConfig: {
            database: 'name',
            host: 'host',
            password: 'pass',
            port: 123,
            username: 'user'
        }
    });
});

test('cli args overrides exportDefsFilePaths', () => {
    const testExportsFolderPath = path.resolve('./test_exports');
    const testExport = 't1.sql';
    const exportPath = './test_exports2/p1.sql'
    const resolvedExportPath = path.resolve(exportPath);
    const opts = loadOptsFromConfig({ _: [exportPath], 'after-all': true, 'before-all': true});
    expect(opts).toEqual({
        afterAllFilePath: `${testExportsFolderPath}/afterAll.js`,
        beforeAllFilePath: `${testExportsFolderPath}/beforeAll.js`,
        dryRun: false,
        exportDefsFilePaths: [ resolvedExportPath],
        mongoDbConfig: {
            connectionString: 'http://mongo',
            dbName: 'mongoDbName',
        },
        sqlDbConfig: {
            database: 'name',
            host: 'host',
            password: 'pass',
            port: 123,
            username: 'user'
        }
    });
});

test('if cli args hooks arent executed unless specified', () => {
    const testExportsFolderPath = path.resolve('./test_exports');
    const testExport = 't1.sql';
    const exportPath = './test_exports2/p1.sql'
    const resolvedExportPath = path.resolve(exportPath);
    const opts = loadOptsFromConfig({ _: [exportPath]});
    expect(opts).toEqual({
        afterAllFilePath: undefined,
        beforeAllFilePath: undefined,
        dryRun: false,
        exportDefsFilePaths: [ resolvedExportPath],
        mongoDbConfig: {
            connectionString: 'http://mongo',
            dbName: 'mongoDbName',
        },
        sqlDbConfig: {
            database: 'name',
            host: 'host',
            password: 'pass',
            port: 123,
            username: 'user'
        }
    });
});

test('-c flag overrides default config file path', () => {
    const testExportsFolderPath = path.resolve('./test_exports');
    const testExport = 't1.sql';
    const exportPath = './test_exports2/p1.sql'
    const resolvedExportPath = path.resolve(exportPath);
    const opts = loadOptsFromConfig({ _: [exportPath], config: './custom.config.js'});
    expect(opts).toEqual({
        afterAllFilePath: undefined,
        beforeAllFilePath: undefined,
        dryRun: false,
        exportDefsFilePaths: [ resolvedExportPath],
        mongoDbConfig: {
            connectionString: 'http://mongo',
            dbName: 'mongoDbName',
        },
        sqlDbConfig: {
            database: 'name',
            host: 'host2',
            password: 'pass',
            port: 123,
            username: 'user'
        }
    });
});