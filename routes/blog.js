const formidable = require('formidable');
const postRoute = (app,db)=>{
    app.post("/createpost", (req,res)=>{
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

            // let fid = req.session.user.id
            
            form.title = form.title || "Title"
            let blogImg = await db.one(`
            INSERT INTO images (img_url) 
            VALUES ('${form.blog_upload}') RETURNING *
            `);
            let bio = await db.one(`
            INSERT INTO blogs (title, blog_Img)
            VALUES ('${form.title}','${blogImg.id}') 
            RETURNING *
            `)
            console.log(bio)
            res.send(bio)
        })
        
    });
}
module.exports = postRoute;