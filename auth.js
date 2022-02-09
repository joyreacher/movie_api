/**
 * @file auth.js
 * # auth.js
 * @module auth
 */
/**
 * @private
 */
const jwtSecret = 'your_jwt_secret'
/**
 * @requires https://www.npmjs.com/package/jsonwebtoken
 */
const jwt = require('jsonwebtoken')
/**
 * @requires https://www.npmjs.com/package/passport
 */
const passport = require('passport')

/**
  @name Local Passport File
 */
require('./passport')
/**
 * @name generateJWTToken
 * @param {Object} user 
 * @returns jwt.sign()
 */
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
  @name /login
  @summary # POST
  @description ## Allow existing users to login | Username, Password
  ```
  { 
    Username,
    Password,
  }
  ``` 
*/

module.exports = (router) => {
  router.post('/login', (req, res) => {
    // authenicate using passport
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