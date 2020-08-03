const express = require('express');
const app = express();
//mike addition
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const session = require('express-session')
const path = require('path')
const methodOverride = require('method-override')


const pgp = require('pg-promise')();

// const connect = require('./config');
//old db, conflicting with new version
// const db = pgp(connect);

const formidable = require('formidable');
const es6R = require('express-es6-template-engine');
const port = 3445;

const updateRoute = require('./routes/setup');
const crudroutes = require('./crud');
//mike addition
const CONNECTION_STRING = "postgres://localhost:5432/fouryou"
const SALT_ROUNDS = 10 
const VIEWS_PATH = path.join(__dirname,'/views')

const db = pgp(CONNECTION_STRING)

updateRoute(app,db);
crudroutes(app,db);

app.use(express.json());
app.engine('html', es6R)
app.set('views', 'templates')
app.set('view engine', 'html')
app.use(express.static("public"));

//mike addition
//view engine
app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials','.mustache'))
// app.set('views','./views')
app.set('views',VIEWS_PATH)
app.set('view engine','mustache')
// app.set('view engine','ejs')
app.use(session({
    secret:'qwertyuiop',
    resave:false,
    saveUninitialized:false
}))
app.use(bodyParser.urlencoded({extended:false}))


app.get('/users/add-article',(req,res)=>{
    res.render('add-article')
})

//after login route to here
app.get('/users/articles',(req,res)=>{
    res.render('articles',{username: req.session.user.username})
})



app.post('/login',(req,res)=>{
    let username = req.body.username
    let password = req.body.password

    db.oneOrNone('SELECT userid,username,password FROM users WHERE username = $1',[username])
    .then((user)=>{
        if(user){
            bcrypt.compare(password,user.password,function(error,result){
                if(result){
                    //username and userid session
                    if(req.session){
                        req.session.user = {userId: user.userId, username: user.username}
                    }

                    //send to next page
                    // res.send("success!")
                    res.redirect('users/articles')
                }else{
                    res.render('login',{message:"Invalid username or password!"})

                }
            })
        }else{
            res.render('login',{message:"Invalid username or password!"})
        }
    })
})
app.post('/login',(req,res)=>{

})
app.get('/login',(req,res) =>{
    res.render('login')
})

app.post('/register',(req,res)=>{
    let username = req.body.username
    let password = req.body.password

    db.oneOrNone('SELECT userid FROM users WHERE username = $1',[username])
    .then((user)=>{
        if(user){
            res.render('register',{message:"Username already exists!"})
        }else{
            bcrypt.hash(password,SALT_ROUNDS,function(error,hash){
                if(error == null){
                    db.none('INSERT INTO users(username,password) VALUES ($1,$2)',[username,hash]) 
                    .then(()=>{
                        res.send('success')
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

//used to display page
app.get('/register',(req,res)=>{
    res.render('register')
})

//logout
// app.delete('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/login')
//   })

//   app.get('/logout', function(req,res){
// req.logout();
// req.session.destroy();
// res.redirect('/')

//   });
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

  //page routes----------------
app.get('/', function(req, res) {
    res.render('articles', { });
});
app.get('/messages', function(req, res) {
    res.render('messages', { });
});
app.get('/newmessages', function(req, res) {
    res.render('newmessages', { });
});
app.get('/explorer', function(req, res) {
    res.render('explorer', { });
});
app.get('/newPost', function(req, res) {
    res.render('newPost', { });
});
app.get('/about', function(req, res) {
    res.render('about', { });
});
app.get('/register', function(req, res) {
    res.render('register', { });
});


// html render
app.get('/profile',(req,res)=>{
    res.render('profile');
});
app.get('/setup',(req,res)=>{
    res.render('setup');
});

// display content
app.post('/profile-info', function(req,res))





app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`)
})
