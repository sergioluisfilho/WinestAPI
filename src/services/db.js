const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST || 'us-cdbr-east-04.cleardb.com',
    user: process.env.DATABASE_USER || 'b4f7c1cd5da301',
    password: process.env.DATABASE_PASSWORD || 'f9a56cb1',
    database: process.env.DATABASE || 'heroku_a202333d65f0114',
});


module.exports = db;