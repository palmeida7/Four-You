const formidable = require('formidable');
const updateRoute = (app,db)=>{
    app.post("/update", (req,res)=>{
        let form = {};
        console.log("**********", req.body,req.session)
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
            console.log(req.user)
            console.log(req.session)

            let fid = req.session.user.userId 
            
            form.bio = form.bio || "a bio"
            form.full_name = form.full_name || "a name"
            let blogImg = await db.one(`
            INSERT INTO images (img_url) 
            VALUES ('${form.blog_upload}') RETURNING *
            `);
            let bio = await db.one(`
            UPDATE users SET bio = '${form.bio}', full_name = '${form.full_name}', pro_id = '${proImg.id}', cov_id = '${covImg.id}' 
            WHERE id = '${fid}'
             RETURNING *
            `)
            delete bio.password
            console.log(bio)
            res.send(bio)
        })
        
    });
}
module.exports = updateRoute;