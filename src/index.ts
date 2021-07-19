import { ExportDefinition } from './exports/exportDefinition';
import { loadExportDefs } from './exports/exportDefLoader';
import { runExports } from './exports/exporter';
import { ExportWriter } from './writers/exportWriter';
import sql from './sqlDb';
import { ConsoleWriter } from './writers/consoleWriter';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { Args, loadOptsFromConfig } from './opts/optsLoader';

const argv = yargs(hideBin(process.argv))
   .usage('$0 path1 path2 ...')
   .alias('p', 'path')
   .describe('p', 'Dir path to scan for export definitions')
   .alias('c', 'config')
   .describe('c', 'Configuration file path (default is ./s2m.config.js)')
   .alias('d', 'dry-run')
   .describe('d', 'Dont write to Mongo, only output to console')
   .alias('b', 'before-all')
   .describe('b', 'Run beforeAll hook if found in config file')
   .alias('a', 'after-all')
   .describe('a', 'Run afterAll hook if found in config file')
   .boolean(['d', 'b', 'a'])
   .argv;


async function main(args: Args):Promise<void> {
   const opts = loadOptsFromConfig(args);
   const exportDefs: ExportDefinition[] = await loadExportDefs(opts.exportDefsFilePaths);
   const writer = new ConsoleWriter();
   await runExports(exportDefs, writer, opts);
   await sql.end({ timeout: 5 });
   process.exit(0);
}

// function getWriter(opts:any): ExportWriter {
//    return null;
// }

main((argv as any) as Args).catch(err => console.error(err));