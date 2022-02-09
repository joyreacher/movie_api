/**
 * @file models.js
 * # models.js
 * @module models
 */
 /**
  *{@link https://mongoosejs.com}
  * @requires https://mongoosejs.com
  */
const mongoose = require('mongoose')
/**
 * @name bcrypt
 * {@link https://www.npmjs.com/package/bcrypt}
 * @requires https://www.npmjs.com/package/bcrypt
 */
const bcrypt = require('bcrypt')

const genreSchema = new mongoose.Schema({
  Name: String,
  Description: String
})
/**
 * @name movieSchema
 * @summary Uses the mongoose ```movies``` model
  ```
    { 
      Title: { type: String, required: true },
      Description: String,
      Genre: genreSchema,
      Director: { Name: String, Bio: String, Birth: Date, Death: Date },
      ImagePath: String,
      Featured: Boolean
    }
  ``` 
 */
const movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: String,
  Genre: genreSchema,
  Director: { Name: String, Bio: String, Birth: Date, Death: Date },
  ImagePath: String,
  Featured: Boolean
}, { versionKey: false })
/**
 * @name userSchema
 * @summary Uses the mongoose ```users``` model
  ```
    { 
      username: { type: String, required: true },
      password: { type: String, required: true },
      email: { type: String, required: true },
      birthday: Date,
      favorite_movies: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
        Title: String,
        ImagePath: String
      }]
    }
  ``` 
 */
const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  birthday: Date,
  favorite_movies: [{
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    Title: String,
    ImagePath: String
  }]
})

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10)
}

// instance method -- dont use arrow functions
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}
/**
 * @public
 * @name Movie
 * @summary mongoose model used in index.js
 */
const Movie = mongoose.model('Movie', movieSchema, 'movies')
/**
 * @public
 * @name User
 * @summary mongoose model used in index.js
 */
const User = mongoose.model('User', userSchema, 'users')

module.exports.Movie = Movie
module.exports.User = User
