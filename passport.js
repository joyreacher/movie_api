/**
 * @file passport.js
 * # passport.js
 * @module passport
 */
 /**
  * @name passport
  * @requires https://www.npmjs.com/package/passport
  */
const passport = require('passport')
/**
  * @name LocalStrategy
  * @requires https://www.npmjs.com/package/passport-local
  */
const LocalStrategy = require('passport-local').Strategy
/**
 * @name Models
 * @summary require from ./models.js
 */
const Models = require('./models.js')
/**
 * @name passportJWT
 * @summary require from ./models.js
 * @requires https://www.npmjs.com/package/passport-jwt
 */
const passportJWT = require('passport-jwt')

/**
 * @name Users 
 * @summary ## Uses the userSchema defined in models.js
 */
const Users = Models.User
/**
 * @name JWTStrategy
 * @todo add description 
 */
const JWTStrategy = passportJWT.Strategy
/**
 * @name ExtractJWT
 * @todo add description 
 */
const ExtractJWT = passportJWT.ExtractJwt

passport.use(new LocalStrategy({
  usernameField: 'Username',
  passwordField: 'Password'
}, (username, password, callback) => {
  console.log(username + ' ' + password)
  Users.findOne({ username: username }, (error, user) => {
    if (error) {
      console.log(error)
      return callback(error)
    }
    if (!user) {
      console.log('incorrect username')
      return callback(null, false, { message: 'Incorrect username or password.' })
    }
    if (!user.validatePassword(password)) {
      console.log('Incorrect password')
      return callback(null, false, { message: 'Incorrect Password.' })
    }
    console.log('finished')
    return callback(null, user)
  })
}
))

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
},
(jwtPayload, callback) => {
  return Users.findById(jwtPayload._id)
    .then((user) => {
      console.log(user)
      return callback(null, user)
    })
    .catch((error) => {
      return callback(error)
    })
}
))
