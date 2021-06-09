const mysql = require('mysql');

const db = mysql.createPool({

    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE || 'winest'

});

module.exports = db;