const SALT_ROUNDS = 10 
const bcrypt = require('bcrypt')

const registerRoute = (app,db)=>{
    app.post('/register',(req,res)=>{
        let username = req.body.username
        let password = req.body.password
        db.oneOrNone('SELECT id FROM users WHERE username = $1',[username])
        .then((user)=>{
            if(user){
                res.render('register',{message:"Username already exists!"})
            }else{
                bcrypt.hash(password,SALT_ROUNDS,function(error,hash){
                    if(error == null){
                        db.none('INSERT INTO users(username,password) VALUES ($1,$2)',[username,hash])
                        .then(()=>{
                            // res.redirect('/setup_profile')
                            res.redirect('/login')
                        })
                    }
                })
                // //insert user into user table
                // db.none('INSERT INTO users (username,password) VALUES($1,$2)', [username,password])
                // // db.none('INSERT INTO users (username,password,email) VALUES($1,$2,$3,$4)', [username,email,password])
                // .then(()=>{
                //     res.send('SUCCESS')
                // })
            }
        })
    //test
    //     console.log(username)
    //     console.log(password)
    // //test
        // res.send("Registered!")
    })
}

module.exports = registerRoute;