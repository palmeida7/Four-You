const createpostRoute = (app,db)=>{
    app.get('/users/profile', (req,res)=>{
        let id = req.session.blog.bid;
        db.any('SELECT title, date_created, blog_img, user_id FROM blogs WHERE bid = $1',[id])
        .then((data)=>{
            // console.log(data)
            res.render('profile',{
                title: data.title,
                datestamp: data.date_created,
                blogimage: data.blog_img,
                usersId: req.session.user.id
                
            });
        })
    });
};

module.exports = createpostRoute;