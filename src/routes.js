const express = require('express');
const routes = express.Router();
const db = require('./services/db');

routes.get('/', async(req, res) => {

    return res.json({message: 'Hello, world'})
    
})

routes.get('/wines', async(req, res) => {
    db.query('show tables', [], async(err, results) => {
        return res.json({data: results})  
    })
})

module.exports = routes