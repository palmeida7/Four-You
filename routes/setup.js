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
            file.path = __dirname.replace('/routes',"") + '/public/images/' + new Date().getTime() + file.name;
            // console.log(file);
        })
        .on('file', (name, file) => {
            form[name] = file.path.replace(__dirname+'/public',"");
            // console.log(file);
        })
        .on('end', async ()=>{
            console.log(form);
            console.log(req.user)
            console.log(req.session)

            let fid = req.session.user.userId 
            form.bio = form.bio || "a bio"
            form.full_name = form.full_name || "a name"
            let userInfo = await db.one(`
            UPDATE users SET bio = '${form.bio}', full_name = '${form.full_name}', pro_url = '${form.pro_upload.replace(/^.*[\\\/]/, '')}', cov_url = '${form.cover_upload.replace(/^.*[\\\/]/, '')}' 
            WHERE id = '${fid}'
             RETURNING *
            `)
            delete userInfo.password
            console.log(userInfo)
            res.send(userInfo)
        })
        
    });
}
module.exports = updateRoute;