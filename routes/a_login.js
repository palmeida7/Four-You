const bcrypt = require('bcrypt')

const loginRoute = (app,db)=>{
    app.post('/login',(req,res)=>{
        let username = req.body.username
        let password = req.body.password
    
        db.oneOrNone('SELECT id,username,password FROM users WHERE username = $1',[username])
        .then((user)=>{
            if(user){
                bcrypt.compare(password,user.password,function(error,result){
                    if(result){
                        //username and id session
                        if(req.session){
                            req.session.user = {userId: user.id, username: user.username}
                        }
    
                        //send to next page
                        // res.send("success!")
                        res.redirect('users/profile')
    
                    }else{
                        res.render('login',{message:"Invalid username or password!"})
    
                    }
                })
            }else{
                res.render('login',{message:"Invalid username or password!"})
            }
        })
    })
}

module.exports = loginRoute;