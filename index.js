/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require('dotenv').config()
const mongoose = require('mongoose')
const Models = require('./models.js')
const { check, validationResult } = require('express-validator')
const Movies = Models.Movie
const Users = Models.User
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const express = require('express'); const morgan = require('morgan')
const app = express()
const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  fallthrough: false,
  lastModified: true,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(morgan('common'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const cors = require('cors')
const allowedOrigins = ['http://localhost:8080', 'http://testsite.com', 'http://localhost:1234']
// ? TO ALLOW API CALLS FROM SPECIFIC ORIGINS
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)

    // error check if a speicific origin is not found
    if (allowedOrigins.indexOf(origin) === -1) {
      const message = 'The CORS policy for this application doesnt allow access from origin ' + origin
      return callback(new Error(message), false)
    }
    return callback(null, true)
  }
}))

// app ensures that Express is available in your "auth.js" file as well
const auth = require('./auth')(app)
const passport = require('passport')
require('./passport')

/**
  Home screen
 */
app.get('/', (req, res) => {
  res.json('Hello welcome to myFlix. Type /documentation to see endpoints.')
})
/**
  Return a list of ALL movies to the user
 */
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
    .then(movie => {
      res.json(movie)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send('Error: ' + error)
    })
})
/*
  Return data ( description, genre, director, image URL, whether is's feature or not (bool))about a single movie by the title to the user
  POSTMAN PARAMS:
  Title - title of a movie
*/
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.title })
    .then((movie) => {
      res.json(movie)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send('Error: ' + error)
    })
})

/*
  Add a new movie
  POSTMAN PARAMS:
  Title - Set the name of the director
  Description - Description of the movie
  Genre - Set the genre's Name value
  Director
  Bio
  DOB
  YOD
  Featured - Bool
*/
app.post('/movie',
  [
    check('Title', 'The movie title is required').isLength({ min: 1 }),
    check('Description', 'Please provide more description').isLength({ min: 5 }),
    check('Genre', 'A movie genre is required').not().isEmpty()
  ],
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    Movies.findOne({ Title: req.query.title })
      .then((movieItem) => {
        if (movieItem) {
          res.json('movie already exists')
        }
        Movies
          .create({
            Title: req.body.Title,
            Description: req.body.Description,
            Genre: { Name: req.body.Genre, Description: req.body.GenreDescription },
            Director: { Name: req.body.Director, Bio: req.body.Bio, Birth: req.body.DOB, Death: req.body.YOD },
            ImagePath: req.body.ImagePath,
            Featured: false
          })
          .then((user) => { res.status(201).json(user) })
          .catch((error) => {
            console.error(error)
            res.status(500).send('Error: ' + error)
          })
      })
  })

/*
  Update a movie resource
  POSTMAN PARAMS:
  Title         - Set the name of the director
  Description   - Description of the movie
  Genre         - {
                GenreName: Set the genre's Name value,
                GenreDescription: Set the genre's Description
                }
  Director      - {
                Director: Set the director's Name value,
                Bio: Set the director's Bio,
                DOB: Set the director's DOB,
                YOD: Set the director's YOD
                }
  ImagePath     - Used to set the image cover,
  Featured      - Bool
*/
app.put('/movie/:title',
  [
    check('Title', 'The movie title is required').isLength({ min: 1 }),
    check('Description', 'Please provide more description').isLength({ min: 5 }),
    check('GenreName', 'A movie genre is required').not().isEmpty(),
    check('ImagePath', 'A link to an image is required').isURL()
  ],
  passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() })
    }
    Movies.findOneAndUpdate({ Title: req.params.title }, {
      $set:
      {
        Title: req.body.Title,
        Description: req.body.Description,
        Genre: { Name: req.body.GenreName, Description: req.body.GenreDescription },
        Director: { Name: req.body.Director, Bio: req.body.Bio, Birth: req.body.DOB, Death: req.body.YOD },
        ImagePath: req.body.ImagePath,
        Featured: false
      }
    },
    { upsert: true },
    (err, updatedMovie) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error:' + err)
      } else {
        res.json(updatedMovie)
      }
    }
    )
  })

/*
  Return data about a genre (description) by name/title
*/
app.get('/genre/:genre', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(req.params.genre)
  Movies.find({ 'Genre.Name': req.params.genre })
    .then(movie => {
      res.json(movie)
    })
})

/*
  Return data about a director(bio, birth year, death year)by Name
*/
app.get('/directors/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find({ 'Director.Name': req.params.name })
    .then((director, err) => {
      if (director[0] === undefined) {
        res.status(500).send(`This director (${req.params.name}) does not exist in this database. The value returned is: ` + err)
      } else {
        res.json(director[0].Director)
      }
    })
})

/*
  Add a director based on movie title
  POSTMAN PARAMS:
  Name - Set the name of the director
  Bio - Bio of the director to be set
  DOB (BIRTH) - Birth year of the director
  YOD (DEATH) - Death year of the director
*/
app.post('/directors?:title',
  [
    // check('Title', 'A movie title is required to assign a director to.' ).not().isEmpty(),
    check('Name', 'A directors name is required.').not().isEmpty(),
    check('Bio', 'Please provide information about the director.').not().isEmpty(),
    check('DOB', 'Please provide the year the director was born.').not().isEmpty()
  ],
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const director = {
      Director:
    {
      Name: req.body.Name,
      Bio: req.body.Bio,
      Birth: req.body.DOB,
      Death: req.body.YOD
    }
    }
    Movies.findOneAndUpdate(
      { Title: req.query.title },
      { $set: director },
      { upsert: true },
      (err, updatedMovie) => {
        if (err) {
        // console.log(err)
          res.status(500).send('Error:' + err)
        } else {
          res.json(updatedMovie)
        }
      }
    )
  })

/*
  Get all users
*/
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
    .then((user) => {
      if (!user) {
        return res.status(400).send('Something went wrong')
      } else {
        res.json(user)
      }
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send('Error: ' + error)
    })
})

/*
  Get user by name
  POSTMAN PARAMS:
  Username - username is case sensitive
*/
app.get('/user/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(req.params.username)
  Users.findOne({ username: req.params.username })
    .then((user) => {
      if (!user) {
        return res.status(400).send('Something went wrong')
      } else {
        res.json(user)
      }
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send('Error: ' + error)
    })
})

/*
  Allow users to update their user info (username, password, email, date of birth)
  POSTMAN PARAMS:
  Username
  Password
  Email
  Birthday
*/
app.put('/users/:username',
  [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required and needs to be at least 6 charactors ').not().isEmpty().isLength({ min: 6 }),
    check('Email', 'Email does not appear to be vaild.').isEmail()
  ],
  passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() })
    }
    const hashedPassword = Users.hashPassword(req.body.Password)
    Users.findOneAndUpdate({ username: req.params.username }, {
      $set:
      {
        username: req.body.Username,
        password: hashedPassword,
        email: req.body.Email,
        birthday: req.body.Birthday
      }
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error:' + err)
      } else {
        res.json(updatedUser)
      }
    }
    )
  })

/*
  Allow new users to register
  POSTMAN PARAMS:
  Username
  Password
  Email
  Birthday
*/
app.post('/users',
  [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be vaild.').isEmail()

  ],
  // check the validation object for errors

  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const hashedPassword = Users.hashPassword(req.body.Password)
    Users.findOne({ username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + ' already exists')
        } else {
          Users
            .create({
              username: req.body.Username,
              password: hashedPassword,
              email: req.body.Email,
              birthday: req.body.Birthday
            })
            .then((user) => { res.status(201).json(user) })
            .catch((error) => {
              console.error(error)
              res.status(500).send('Error: ' + error)
            })
        }
      })
      .catch((error) => {
        console.error(error)
        res.status(500).send('Error: ' + error)
      })
  })

/*
  Allow users to add a movie to ther list of favorites
  POSTMAN:
  USERNAME = username of the user,
  TITLE = title of the movie the user wants to add to favorites
*/
app.post('/users/mymovies/add',
  [
    check('Username', 'A user is required to assign a favorite movie.').notEmpty(),
    check('Title', 'Title of a movie is required').isLength({ min: 1 })
  ],
  passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    Movies.findOne({ Title: req.body.Title })
      .then((movie) => {
        if (movie) {
          Users.find({ username: req.body.Username })
            .then((user) => {
              if (user[0].favorite_movies !== undefined) {
              // IF THE FAVORITE MOVIES ARRAY EXISTS BUT HAS NO VALUES
              // ADD THE MOVIE
                if (user[0].favorite_movies == '') {
                  console.log('favorite_movies is EMPTY')
                  Users.findOneAndUpdate(
                    { username: req.body.Username },
                    { $push: { favorite_movies: movie } },
                    { new: true },
                    (err, updatedUser) => {
                      if (err) {
                        console.log(err)
                        res.status(500).send('Error: ' + err)
                      } else {
                        res.json(updatedUser)
                      }
                    }
                  )
                } else {
                  console.log('favorite_movies is NOT EMPTY')
                  user[0].favorite_movies.forEach((title) => {
                    if (title.Title == req.body.Title) {
                      console.log('There is a match in the Database. Dont add movie.')
                      res.status(400).send(req.body.Title + ' is already saved to your favorites')
                    }
                    console.log('There is no match in the Database. Add movie.')
                    // Users.findOneAndUpdate(
                    //   { username: req.body.Username },
                    //   { $push: { favorite_movies: movie } },
                    //   { new: true },
                    //   (err, updatedUser) => {
                    //     if (err) {
                    //       console.log(err)
                    //       res.status(500).send('Error: ' + err)
                    //     } else {
                    //       res.status(200).send(updatedUser)
                    //     }
                    //   }
                    // )
                  })
                  Users.findOneAndUpdate(
                    { username: req.body.Username },
                    { $push: { favorite_movies: movie } },
                    { new: true },
                    (err, updatedUser) => {
                      if (err) {
                        console.log(err)
                        res.status(500).send('Error: ' + err)
                      } else {
                        res.status(200).send(updatedUser)
                      }
                    }
                  )
                }
              }
            })
        } else {
          res.status(400).send(req.body.Title + ' does not exist in your database')
        }
      })
  })

/*
  ALlow users to remove a movie from their list of favorites
  POSTMAN:
  USERNAME = username of the user,
  TITLE = title of the movie the user wants to add to favorites
*/
app.post('/users/mymovies/delete',
  [
    check('Username', 'A user is required to assign a favorite movie.').notEmpty(),
    check('Title', 'Title of a movie is required').isLength({ min: 1 })
  ],
  passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    Users.find({ username: req.body.Username })
      .then((favorite) => {
      // console.log(favorite)
        if (!favorite) {
        // console.log(movie)
        // res.json(favorite)
          res.status(400).send(favorite)
        } else {
          let deletedTitle
          favorite[0].favorite_movies.forEach((title, index) => {
            console.log(index)
            if (title.Title !== req.body.Title) {
              console.log(title.Title + ' is not a match to ' + req.body.Title)
            // res.status(400).send('title.Title did not equal req.body.Title.');
            } else {
              deletedTitle = title.Title
              favorite[0].favorite_movies[index].remove()
              favorite[0].save()
              console.log('match')
            }
          })
          if (deletedTitle) {
            res.status(200).send(deletedTitle + ' was deleted.')
          } else {
            res.status(500).send(deletedTitle + ' is the value of deletedTitle.')
          }
        }
      })
  })

/*
  Allow existing users to deregister
  POSTMAN PARAMS
  Username
  Email
*/
app.post('/users/unregister',
  [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Email', 'This email does not exist').normalizeEmail().isEmail()
  ],
  passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    Users.findOneAndDelete({ username: req.body.Username, email: req.body.Email })
      .then((user) => {
        if (!user) {
          res.status(400).send('Could not find Username and Email combination. 💆 ')
        }
        res.json(user.username + ' successfully delted. ✅ ')
      })
  })

app.use(express.static('public', options))
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send('We have a problem')
})
const port = process.env.PORT || 8080
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port)
})