# fourYou

![](public/readme_images/readMe_.png)

## Overview: 
fourYou is an interactive site that allows users to experience a personalized environment with their posts and thoughts. 

### Secure * Personalized * Interactive * Fun...fourYou!

![](public/readme_images/fourYOU_userFlow.png)

## The Team: team of four members operating remotely.
### Eric Yim: https://github.com/tknyim
**Primary team role:** Team Lead; Front-End markup and styling, Javascript Function writer

**Contributions:** Designed and implemented profile page. Assisted with Style and Layout Design. Oversaw organization of all javascript files and implementations.  

### Mike Cadima: https://github.com/mikecadima
**Primary team role:** Lead Developer; Front-End markup and styling, concepting and Javascript Function writer

**Contributions:** Oversaw creation of encryted login page. Implemented "slideable" menu and created div block with data from Weather API and a time counter function. Oversaw handling of all Github merges and deployment of application to Amazon Web Services.

### PJ Almeida: https://github.com/palmeida7
**Primary team role:** Project Coordinator; Front-End markup and styling, concepting and Javascript Function writer

**Contributions:** Oversaw project coordination. Utilized Trello to track team progress Assisted in design layout and javascript functions. Created databases. Created technical document.

### Ivan Davis: https://github.com/techbyivan
**Primary team role:** Lead UI/UX Designer; Front-End markup and styling, concepting and Javascript Function writer

**Contributions:** Oversaw creative layout design of webpages. Created About page.

## Screenshot:
![](public/readme_images/explorer_ss.jpg)

## What we used:
### Languages:
- HTML5
- CSS
- JavaScript
- BULMA
- NodeJS
- ExpressJS
- Postgresql

### APIs
- Open Weather Map

### Other
- GitHub
- Ubuntu
- Visual Studio Code
- Amazon Web Services
- Trello
- Slack
- Zoom
- Mustache pages

### Express Dependencies:
- Bcrypt
- Body-parser
- Express
- Express-es6-template-engine
- Express-flash
- Express-session
- Formidable
- Mustache-express
- Passport
- Passport-local
- Postgresql
- Pg-promise

## MVP (Minimum Viable Product):
- Encrypted Login
- Utilize Bulma for design and layout
- Create an application that will allow the user to login in and post images

## Stretch Goals Completed
- Encryted login
- Personalized Registration
- Responsive Profile Page
- Modern look of webpages
- Implementing data div with Weather API and time counter function

## Stretch Goals Future
- Allowing users to create personal profiles and connect with each other and comment 
- Implementing searchability of posts
- Creating private message system between users

## Challenges & Solutions:
### ***Challenge:*** Installing a design using Bulma.
### ***Solution:*** Reading documentation, trial and error. The website is viewable across any medium: computer, tablet or smart phone.
___
### ***Challenge:*** Implementing efficient code to route to correct pages.

### ***Solution:*** Reading documentation, trial and error. Utilizing "pair-programming" to conduct code analysis and solving the problem together.
___
### ***Challenge:*** Scope creep.

### ***Solution:*** Scaling back to original minimum viable product and building a functioning product from there. Not to get ahead of what works without properly testing everything.

## Code Snippets:
### Reads images and converts to data to direct them to the table.
```javascript

let profile = "";
let cover = "";

function ReadFile(evt, id) {
    let FR= new FileReader();
    FR.onload = function(e) {
        document.getElementById(id).src = e.target.result;
    };
    FR.readAsDataURL(evt.target.files[0]);
    if (id == "poimg"){
        profile = evt.target.files[0];
    } else if (id == "coimg"){
        cover = evt.target.files[0];
    }
    return evt.target.files[0];
};
document.getElementById("avatar").addEventListener("change", (evt)=>ReadFile(evt,"poimg"), false);
document.getElementById("cover").addEventListener("change", (evt)=>ReadFile(evt,"coimg"), false);


const uploadToServer = (evt) =>{
    const formData = new FormData();
    formData.append('pro_upload', profile);
    formData.append('cover_upload', cover);
    formData.append('full_name',document.getElementById('fullname').value);
    formData.append('bio',document.getElementById('bio').value);
    console.log(formData);
    fetch('/update', {
        method:'POST',
        body:formData
    })
    .then(resp=>resp.json())
    .then(data=>{
        window.location = '/users/profile'
        console.log(data)})
    .catch(error=>console.log(error))
}
// document.getElementById("imgupload").addEventListener("input", ReadFile);
document.getElementById("submit").addEventListener("click", uploadToServer);
```
### Main app.js file to show logic of routes
```javascript
const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')

const pgp = require('pg-promise')();

const es6R = require('express-es6-template-engine');
const port = 3445;

const CONNECTION_STRING = "postgres://localhost:5432/foryou"
const VIEWS_PATH = path.join(__dirname,'/views')

const db = pgp(CONNECTION_STRING)

app.use(express.json());
app.engine('html', es6R)
app.set('views', 'templates')
app.set('view engine', 'html')
app.use(express.static("public"));

app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials','.mustache'))
app.set('views',VIEWS_PATH)
app.set('view engine','mustache')
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
updateRoute(app,db);
postRoute(app,db);
imageRoute(app,db);
crudroutes(app,db);

const profileRoute = require('./routes/a_profile');
const createpostRoute = require('./routes/a_post');
const loginRoute = require('./routes/a_login');
const registerRoute = require('./routes/a_register');

profileRoute(app,db);
loginRoute(app,db);
registerRoute(app,db);

const logoutRoute = require('./routes/a_logout')
logoutRoute(app);


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
```
