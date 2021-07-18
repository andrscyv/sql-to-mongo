export class ExportDefinition {

    constructor(
        public collectionName: string,
        public sqlQuery: string,
        public beforeEach?: Function,
        public afterEach?: Function
        ) {}

}