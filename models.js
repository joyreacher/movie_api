const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const genreSchema = new mongoose.Schema({
  Name: String,
  Description: String
})

const movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: String,
  Genre: genreSchema,
  Director: { Name: String, Bio: String, Birth: Date, Death: Date },
  ImagePath: String,
  Featured: Boolean
}, { versionKey: false })

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  birthday: Date,
  favorite_movies: [{
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    Title: String
  }]
})

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10)
}

// instance method -- dont use arrow functions
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const Movie = mongoose.model('Movie', movieSchema, 'movies')
const User = mongoose.model('User', userSchema, 'users')

module.exports.Movie = Movie
module.exports.User = User
