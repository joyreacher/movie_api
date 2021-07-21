const mongoose = require('mongoose')

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

const Movie = mongoose.model('Movie', movieSchema, 'movies')
const User = mongoose.model('User', userSchema, 'users')

module.exports.Movie = Movie
module.exports.User = User
