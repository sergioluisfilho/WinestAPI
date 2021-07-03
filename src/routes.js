const express = require('express');
const routes = express.Router();
const wine = require('./wine');

routes.get('/', async(req, res) => {
    return res.json({message: 'Hello, world'})
})

routes.get('/filter/:title', wine.filterWine);

routes.get('/wines/:id', wine.getWine);

routes.get('/wines', wine.getWines);

routes.post('/wines', wine.postWine);

routes.delete('/wines/:id',wine.deleteWine);

routes.put('/wines/:id',wine.updateWine);

module.exports = routes