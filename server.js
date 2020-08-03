if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  const express = require('express')
  const app = express()
  const bcrypt = require('bcrypt')
  const passport = require('passport')
  const flash = require('express-flash')
  const session = require('express-session')
  const methodOverride = require('method-override')

//db for users
  // const pgp = require('pg-promise')()
  // const CONNECTION_STRING = "postgres://localhost:5432/fouryou"
//   const db = pgp(CONNECTION_STRING)
  // app.use(bodyParser.urlencoded({extended:false}))
// console.log(name)
// console.log(password)
// const users = CONNECTION_STRING


const users = install.sql
//original
  // const users = []


  //burger menu route
  app.use(express.json());
  app.use(express.static("public"));


  app.set('view engine', 'ejs')

  app.use(express.urlencoded({ extended: false }))
  app.use(flash())
  app.use(session({
    secret: "process.env.SESSION_SECRET", 
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  app.use(methodOverride('_method'))
  
  const initializePassport = require('./passport-config')
const bodyParser = require('body-parser')
  initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
  )
  
  app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
  })
  
  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
  })


  
  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))
  
  app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
  })
  
  // app.post('/register', checkNotAuthenticated, userRoute.createUser)
  app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
        // id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      res.redirect('/login')
    } catch {
      res.redirect('/register')
    }
    //check---------
    console.log.apply(users)
  })
  //logout
  app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }
  //page routes----------------
  app.get('/index', function(req, res) {
    res.render('index', { });
  });
  app.get('/message', function(req, res) {
    res.render('message', { });
  });
  app.get('/newMessage', function(req, res) {
    res.render('newMessage', { });
  });
  app.get('/blog', function(req, res) {
    res.render('blog', { });
  });
  app.get('/newPost', function(req, res) {
    res.render('newPost', { });
  });
  app.get('/about', function(req, res) {
    res.render('about', { });
  });

  app.listen(3000)