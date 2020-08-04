const express = require('express');
const app = express();

const pgp = require('pg-promise')();
const connect = require('./config');
const db = pgp(connect);
const formidable = require('formidable');
const es6R = require('express-es6-template-engine');
const port = 3445;

const updateRoute = require('./routes/setup');
const crudroutes = require('./crud');



updateRoute(app,db);
crudroutes(app,db);

app.use(express.json());
app.engine('html', es6R)
app.set('views', 'templates')
app.set('view engine', 'html')
app.use(express.static("public"));


app.get('/setup',(req,res)=>{
    res.render('setup');
});



app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`)
})
