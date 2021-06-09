const express = require('express');
const app = express();
const cors = require('cors');

const routes = require('./routes');
const db = require('./services/db');

// db.connect((error) => error ? console.log(error) : console.log('Database Connected'));

app.use(express.json());
app.use(cors());
app.use(routes);

const port = process.env.PORT || 7436;

app.listen(port, ()=>{
    console.log(`Server listen at ${port} at ${Date()}`);
});