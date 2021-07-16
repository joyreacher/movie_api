const mongoose = require('mongoose')
const { Schema } = mongoose;

const genreSchema = new Schema({
  Name: [{
    type: mongoose.Schema.Types.String,
    ref: 'Movie'
  }],
  Description: [{
    type: mongoose.Schema.Types.String,
    ref: 'Movie'
  }]
})

const directorSchema = new Schema({
  // Name: String,
  Name: {
    type: mongoose.Schema.Types.String,
    ref: 'Director'
  },
  // Bio: String, 
  Bio: {
    type: mongoose.Schema.Types.String,
    ref: 'Director'
  },
  Birth: Date,
  Death: Date
})

let movieSchema = mongoose.Schema({
  
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: {
    Name: {
      type: mongoose.Schema.Types.String,
      ref: 'Genre'
    },
    Description: {
      type: mongoose.Schema.Types.String,
      ref: 'Genre'
    } 
  },
  Director: {
    // Name: String,
    Name: {
      type: mongoose.Schema.Types.String,
      ref: 'Director'
    },
    // Bio: String
    Bio: {
      type: mongoose.Schema.Types.String,
      ref: 'Director'
    },
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});

let userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  birthday: Date,
  favorite_movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

let Movie = mongoose.model('Movie', movieSchema, 'movies');
let User = mongoose.model('User', userSchema);
let Genre = mongoose.model('Modal', genreSchema, 'genres');
let Director = mongoose.model('Director', directorSchema, 'directors');

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;