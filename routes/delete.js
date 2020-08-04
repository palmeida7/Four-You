const deletePost = (app,db)=>{
    app.post('/delete-post',(req,res) => {
        let blogId = req.session.blog.bid
        db.none('DELETE FROM blogs WHERE bid = $1',[blogId])
        .then(() => {
            res.redirect('/users/profile')
        })
    })
}

module.exports = deletePost;