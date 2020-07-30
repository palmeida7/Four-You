const express = require('express');
const app = express();
require("./api-routes")(app);
const pgp = require('pg-promise')();
const connect = require('./config');
const db = pgp(connect);
const formidable = require('formidable');
const port = 3445;
const crudroutes = require('./crud')
crudroutes(app,db)

app.use(express.json());
app.use(express.static("public"));

app.post("/image-uploaded", (req,res)=>{

    let form = {};

    new formidable.IncomingForm().parse(req)
    .on('field', (name, field) => {
        form[name] = field;
    })
    .on('fileBegin', (name, file) => {
        file.path = __dirname + '/public/images/' + new Date().getTime() + file.name
    })
    .on('file', (name, file) => {
        form[name] = file.path.replace(__dirname+'/public',"");
    })
    .on('end', async ()=>{
        console.log(form);
        let fid = 1 // req.user.id || 1
        form.bio = form.bio || "a bio"
        form.fullname = form.fullname || "a name"
        let proImg = await db.one(`
        INSERT INTO images (owner_id, img_type, img_url) 
        VALUES ('${fid}','profile', '${form.pro_upload}') RETURNING *
    `);
        let covImg = await db.one(`
        INSERT INTO images (owner_id, img_type, img_url) 
        VALUES ('${fid}','cover', '${form.cover_upload}') RETURNING *
    `);
        let proInfo = await db.one(`
        INSERT INTO profile (owner_id, bio, full_name, pro_id, cov_id)
        VALUES ('${fid}','${form.bio}','${form.fullname}','${proImg.id}','${covImg.id}') RETURNING *
        `)
        res.send(proInfo)
    })
    
});



app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`)
})
