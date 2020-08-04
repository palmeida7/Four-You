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
            let date = new Date().toDateString()
            form.title = form.title || "Title"
            
            let postInfo = await db.one(`
            INSERT INTO blogs (title,date_created, blog_img, user_id)
            VALUES ('${form.title}','${date}','${form.blog_upload.replace(/^.*[\\\/]/, '')}','${userId}') 
            RETURNING *
            `)
            console.log(postInfo)
            res.send(postInfo)
        })
        
    });
}
module.exports = postRoute;