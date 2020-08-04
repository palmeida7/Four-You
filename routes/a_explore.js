const exploreRoute = (app,db)=>{
    app.get('/explorer', async (req,res)=>{
        let username = req.session.user.username;

        console.log(req.session)
        let profile = await db.oneOrNone('SELECT full_name, username, pro_url, cov_url, bio FROM users WHERE username = $1',[username])

        let posts = await db.any(`SELECT * FROM blogs WHERE user_id = '${req.session.user.userId}'`)
        let resSend = {
            ...profile, posts
        }
        console.log(resSend);
        res.render('explorer', resSend)
    })
};

module.exports = exploreRoute;