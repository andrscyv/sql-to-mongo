const postgres = require('postgres')

const sql = postgres( { 
    host: process.env.SQLDB_HOST,
    port: process.env.SQLDB_PORT,
    username: process.env.SQLDB_USER,
    password: process.env.SQLDB_PASSWORD,
    database: process.env.SQLDB_NAME,
 }) 

export default sql;