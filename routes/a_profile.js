const profileRoute = (app,db)=>{
    app.get('/users/profile', async (req,res)=>{
        let username = req.session.user.username;

        console.log(req.session)
        let profile = await db.oneOrNone('SELECT full_name, username, pro_url, cov_url, bio FROM users WHERE username = $1',[username])
        // .then((data)=>{
        //     // console.log(data)
        //     res.render('profile',{
        //         fullname: data.full_name,
        //         username: req.session.user.username,
        //         proimage: data.pro_url,
        //         covimage: data.cov_url,
        //         bio: data.bio,
        //         // timestamp: new Date().toDateString()
        //     });
        // })
        let posts = await db.any(`SELECT * FROM blogs WHERE user_id = '${req.session.user.userId}'`)
        // console.log(profile)
        // console.log(posts)
        let resSend = {
            ...profile, posts
        }
        console.log(resSend);
        res.render('profile', resSend)
    })

    // app.get('/users/profile', (req,res)=>{
    //     let id = req.params.bid;
    //     db.oneOrNone('SELECT title, blog_img, user_id FROM blogs WHERE bid = $1',[id])
    //     .then((data)=>{
    //         // console.log(data)
    //         res.render('profile',{
    //             title: data.title,
    //             blogimage: data.blog_img,
    //             usersId: req.session.user.id
                
    //         });
    //     })
    // });
};

module.exports = profileRoute;