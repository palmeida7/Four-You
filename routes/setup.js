const formidable = require('formidable');
const updateRoute = (app,db)=>{
    app.post("/update", (req,res)=>{
        let form = {};
        new formidable.IncomingForm().parse(req)
        .on('field', (name, field) => {
            form[name] = field;
        })
        .on('fileBegin', (name, file) => {
            file.path = __dirname.replace('/routes',"") + '/public/images/' + new Date().getTime() + file.name
        })
        .on('file', (name, file) => {
            form[name] = file.path.replace(__dirname+'/public',"");
        })
        .on('end', async ()=>{
            console.log(form);
            let fid = 1 // req.user.id || 1
            form.bio = form.bio || "a bio"
            form.full_name = form.full_name || "a name"
            let proImg = await db.one(`
            INSERT INTO images (img_url) 
            VALUES ('${form.pro_upload}') RETURNING *
        `);
            let covImg = await db.one(`
            INSERT INTO images (img_url) 
            VALUES ('${form.cover_upload}') RETURNING *
        `);
            let bio = await db.one(`
            INSERT INTO users (bio, full_name, pro_id, cov_id)
            VALUES ('${form.bio}','${form.full_name}','${proImg.id}','${covImg.id}') RETURNING *
            `)
            console.log(bio)
            res.send(bio)
        })
        
    });
}
module.exports = updateRoute;