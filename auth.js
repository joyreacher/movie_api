// This has to be the same key used in the JWTStrategy
const jwtSecret = 'your_jwt_secret'

const jwt = require('jsonwebtoken')
const passport = require('passport')

// Your local passport file
require('./passport')

const generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    // This is the username your encoding in the JWT
    subject: toString(user.Username),
    // This specifies that the token will expire in 7 days
    expiresIn: '7d',
    // This is the algorithm used to "sign" or encode the values of the JWT
    algorithm: 'HS256'
  })
}

/**
  POST login
 */

module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        })
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error)
        }
        const token = generateJWTToken(user.toJSON())
        // Return the token
        return res.json({ user, token })
      })
    })(req, res)
  })
}

module.exports = (router) => {
  router.post('/register', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Could not register',
          user: user
        })
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error)
        }
        const token = generateJWTToken(user.toJSON())
        // Return the token
        return res.json({ user, token })
      })
    })(req, res)
  })
}
