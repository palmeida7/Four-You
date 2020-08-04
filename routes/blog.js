const formidable = require('formidable');
const postRoute = (app,db)=>{
    app.post("/createpost", (req,res)=>{
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
            console.log(req.user)
            console.log(req.session)

            let userId = req.session.user.userId
            
            form.title = form.title || "Title"
            
            let postInfo = await db.one(`
            INSERT INTO blogs (title, user_id, blog_Img)
            VALUES ('${form.title}','${userId}','${form.blog_upload.replace(/^.*[\\\/]/, '')}') 
            RETURNING *
            `)
            console.log(postInfo)
            res.send(postInfo)
        })
        
    });
}
module.exports = postRoute;