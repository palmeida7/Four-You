const express = require('express');
const app = express();
require("./api-routes")(app);//sets the api
const pgp = require('pg-promise')();
const connect = require('./config');
const db = pgp(connect);
const port = 5434;


app.use(express.json());
app.use(express.static("public"));




app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`)
})