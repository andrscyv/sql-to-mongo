module.exports = {
    exportsDirPath: './test_exports',
    sqlDbConfig: {
        host: 'localhost',
        port: 5432,
        database: 'pongo_test',
        username: 'postgres',
        password: 'postgres'
    },
    mongoDbConfig: {
        connectionString: 'mongodb://admin:admin@localhost:27017',
        dbName: 'pongo_test'
    }
}