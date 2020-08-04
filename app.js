const express = require('express');
const app = express();
//mike addition
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
// const bcrypt = require('bcrypt')
const session = require('express-session')
const path = require('path')
// const methodOverride = require('method-override')


const pgp = require('pg-promise')();

// const connect = require('./config');
//old db, conflicting with new version
// const db = pgp(connect);

// const formidable = require('formidable');
const es6R = require('express-es6-template-engine');
const port = 3445;


//mike addition
const CONNECTION_STRING = "postgres://localhost:5432/foryou"
// const SALT_ROUNDS = 10 
const VIEWS_PATH = path.join(__dirname,'/views')

const db = pgp(CONNECTION_STRING)



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
const imageRoute = require('./routes/image');
const updateRoute = require('./routes/setup');
const postRoute = require('./routes/blog');
const crudroutes = require('./crud');
const deletePost = require('./routes/delete');
updateRoute(app,db);
postRoute(app,db);
imageRoute(app,db);
deletePost(app,db);
// crudroutes(app,db);
// app.get('/users/add-article',(req,res)=>{
//     res.render('add-article')
// })

//after login route to here//////////////////////////////////////
const profileRoute = require('./routes/a_profile');
const createpostRoute = require('./routes/a_post');
const loginRoute = require('./routes/a_login');
const registerRoute = require('./routes/a_register');

profileRoute(app,db);
// createpostRoute(app,db);
loginRoute(app,db);
registerRoute(app,db);



//logout
const logoutRoute = require('./routes/a_logout')
logoutRoute(app);



  //page routes----------------
app.get('/', function(req, res) {
    res.render('login', { });
});
app.get('/login',(req,res) =>{
    res.render('login')
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
app.get('/setup_profile', function(req, res) {
    res.render('setup_profile', { });
});
app.get('/profile', function(req, res) {
    res.render('profile', { });
});



app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`)
})