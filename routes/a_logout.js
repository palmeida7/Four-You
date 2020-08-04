const logoutRoute = (app)=>{
    app.get('/logout',(req,res,next)=>{
        if(req.session){
            req.session.destroy((error)=>{
                if(error){
                    next(error)
                } else {
                    res.redirect('/login')
                }
            })
        }
    })
}

module.exports = logoutRoute;