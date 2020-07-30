const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)
    // console.log(user)
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }
    // console.log(user,password,email)
    try {
      if (await bcrypt.compare(password, user.password)) {
        console.log(user,"***********")
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => { 
    console.log(user,done)
    done(null, user)})
  passport.deserializeUser((user, done) => {
    return done(null, getUserById(user.id))
  })
}

module.exports = initialize