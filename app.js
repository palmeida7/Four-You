const express = require('express');
const app = express();
require("./api-routes")(app);//sets the api
const pgp = require('pg-promise')();
const connect = require('./config');
const db = pgp(connect);
const formidable = require('formidable');
const port = 3445;


app.use(express.json());
app.use(express.static("public"));

app.post("/image-uploaded", (req,res)=>{

    let form = {};

    //this will take all of the fields (including images) and put the value in the form object above
    new formidable.IncomingForm().parse(req)
    .on('field', (name, field) => {
        form[name] = field;
    })
    .on('fileBegin', (name, file) => {
        //sets the path to save the image
        file.path = __dirname + '/public/pro_img/' + new Date().getTime() + file.name
    })
    .on('file', (name, file) => {
        //console.log('Uploaded file', name, file);
        form.profile_image = file.path.replace(__dirname+'/public',"");
    })
    .on('end', ()=>{
        console.log(form);
        //Now i can save the form to the database
        //db.createItem(form)//not exact code here
        //.then(result=>res.send(result))

        res.send(form) //this just sends databack
    })
})

app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`)
})