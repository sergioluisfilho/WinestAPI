const express = require('express');
const routes = express.Router();
const wine = require('./wine');

routes.get('/', async(req, res) => {
    return res.json({message: 'Hello, world'})
})

routes.get('/wines', wine.getWines);

routes.post('/wines', wine.postWine);


module.exports = routes