# sql-to-mongo

Cli tool to export data from sql database to mongo using simple SQL queries. (We only support PostgreSQL for now)

Inspired by [this](https://medium.com/containerum/how-we-migrated-data-from-postgresql-to-mongodb-6211886c5944) article from Containerum.

## Installation

Use [npm](https://www.npmjs.com/) to install the cli.

```bash
npm install -g sql-to-mongo
```

You can verify that the installation was succesful with: 

```bash
s2m --version
```
## Usage
Suppose you have a sqlDb with a customers table : 
<table class="ws-table-all notranslate">
  <tbody><tr>
    <th>CustomerID</th>
    <th>CustomerName</th>
    <th>City</th>
    <th>PostalCode</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>1<br><br></td>
    <td>Alfreds Futterkiste</td>
    <td>Berlin</td>
    <td>12209</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Ana Trujillo Emparedados y helados</td>
    <td>México D.F.</td>
    <td>05021</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Antonio Moreno Taquería</td>
    <td>México D.F.</td>
    <td>05023</td>
    <td>Mexico</td>
  </tr>
</tbody></table>

Write an sql query to define the data you want to export and save it to a file with the name that the mongo collection should have: 

### .../exports/customers.sql

```SQL
SELECT  "CustomerName" as customerName , "City" as city, "PostalCode" as cp FROM customers;
```
Sql queries can be as complex as you need. You can make joins or even create nested structures with functions such as row_to_json or array_to_json. Read the original [article](https://medium.com/containerum/how-we-migrated-data-from-postgresql-to-mongodb-6211886c5944) from Containerum for examples.

Write your connection data in a config file (default location and name is ./s2m.config.js): 

### s2m.config.js
```javascript
module.exports = {
    exportsDirPath: './exports',
    sqlDbConfig: {
        host: 'localhost',
        port: 5432,
        database: 'sqlDbName',
        username: 'admin',
        password: 'admin'
    },
    mongoDbConfig: {
        connectionString: 'mongodb://admin:admin@localhost:27017',
        dbName: 'mongoDbName'
    }
}
```

Test run your exports with --dry-run. This will only output the data to console and won't write to Mongo.

```bash
s2m --dry-run
```

```javascript
{
    customerName: "Alfreds Futterkiste",
    city: "Berlin",
    cp: 12209
},
{
    customerName: "Ana trujillo Emparedados y helados",
    city: "México D.F",
    cp: 05021
}
...
```

To have the export data written to Mongo simply run. 

```bash
s2m
```

## BeforeAll and AfterAll hooks
In your exports directory you can add beforeAll.js and afterAll.js files to execute arbitrary Mongo's node js driver instructions before and after the exports are executed : 

For instance you can clean the collections before insertion : 
### .../exports/beforeAll.js
```javascript
modules.exports = async function(db) {
    await db.collection('customers').deleteMany({})
}
```

Or you can make arbitrary transforms after the data was imported into Mongo

### .../exports/afterAll.js
```javascript
modules.exports = async function(db) {
    await db.collection('customers').updateMany({}, {$set: {createdAt: new Date()}});
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)