const express = require('express');
const app = express();
//import midddleware
const cors = require('cors')
//import db connection file
require('./startup/mongoose')();
//import route file
const heroes = require('./routes/heroes')

//Middleware
app.use(cors());
app.use(express.json());

//assign port
const port = process.env.PORT || 5002;

//route to api
app.use('/', heroes)

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})