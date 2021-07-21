/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require('dotenv').config()
const mongoose = require('mongoose')
const Models = require('./models.js')
const Movies = Models.Movie
const Users = Models.User
mongoose.connect(process.env.BACKENDKEY, { useNewUrlParser: true, useUnifiedTopology: true })
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

// app ensures that Express is available in your "auth.js" file as well
let auth = require('./auth')(app)
const passport = require('passport');
const e = require('express')
require('./passport.js');


/*
  Add a new movie
  POSTMAN PARAMS:
  Title - Set the name of the director
  Description - Description of the movie
  Genre - Set the genre's Name value
  Featured - Bool
*/
app.post('/movie', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(req.body)
  // const movie = { Director: { Name: req.body.Name, Bio: req.body.Bio, Birth: req.body.DOB, Death: req.body.YOD } }
  // const director = { Director: { Name: req.body.Name, Bio: req.body.Bio, Birth: req.body.DOB, Death: req.body.YOD } }
  Movies.findOne({ Title: req.query.title })
    .then((movieItem)=>{
      if(movieItem){
        res.json('movie already exists')
      }
      Movies
      .create({
        Title: req.body.Title,
        Description: req.body.Description,
        Genre: {"Name": req.body.Genre, "Description": req.body.GenreDescription},
        Director: {"Name": req.body.Director, "Bio": req.body.Bio, "Birth": req.body.DOB, "Death": req.body.YOD},
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
                Name: Set the genre's Name value, 
                GenreDescription: Set the genre's Description
                }
  Director      - {
                Name: Set the director's Name value, 
                Bio: Set the director's Bio,
                Birth: Set the director's DOB,
                Death: Set the director's YOD
                }
  ImagePath     - Used to set the image cover,
  Featured      - Bool
*/
app.put('/movie/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(req.body)
  Movies.findOneAndUpdate({ Title: req.params.title }, {
    $set:
      {
        Title: req.body.Title,
        Description: req.body.Description,
        Genre: {"Name": req.body.Genre, "Description": req.body.GenreDescription},
        Director: {"Name": req.body.Director, "Bio": req.body.Bio, "Birth": req.body.DOB, "Death": req.body.YOD},
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
  Add a director based on movie title
  POSTMAN PARAMS:
  Name - Set the name of the director
  Bio - Bio of the director to be set
  DOB (BIRTH) - Birth year of the director
  YOD (DEATH) - Death year of the director
*/
app.post('/directors?:title', passport.authenticate('jwt', { session: false }),  (req, res) => {
  console.log(req.query.title)
  const director = { Director: { Name: req.body.Name, Bio: req.body.Bio, Birth: req.body.DOB, Death: req.body.YOD } }
  Movies.findOneAndUpdate(
    { Title: req.query.title },
    { $set: director },
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

/**
  Return a list of ALL movies to the user
 */
app.get('/movies',passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
    .then(movie => {
      res.json(movie)
    })
    .catch((error)=>{
      console.log(error)
      res.status(500).send("Error: " + error)
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
  Return data about a genre (description) by name/title
 */
  app.get('/genre/:genre', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.params.genre)
    Movies.find({"Genre.Name": req.params.genre})
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
  Users.findOne({"username": req.params.username})
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
  Allow new users to register
  POSTMAN PARAMS:
  Username
  Password
  Email
  Birthday
*/
app.post('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists')
      } else {
        Users
          .create({
            username: req.body.Username,
            password: req.body.Password,
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
  Allow users to update their user info (username, password, email, date of birth)
  POSTMAN PARAMS:
  Username
  Password
  Email
  Birthday
*/

app.put('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(req.body)
  Users.findOneAndUpdate({ username: req.params.username }, {
    $set:
      {
        username: req.body.Username,
        password: req.body.Password,
        email: req.body.Email,
        birth_date: req.body.Birthday
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
  Allow users to add a movie to ther list of favorites
  POSTMAN:
  USERNAME = username of the user,
  TITLE = title of the movie the user wants to add to favorites
*/
app.post('/users/mymovies/add', passport.authenticate('jwt', { session: false }), (req, res) => {
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
                })
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

app.post('/users/mymovies/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
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
app.post('/users/unregister', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndDelete({ username: req.body.Username, email: req.body.Email })
    .then((user) => {
      if (!user.username) {
        res.status(400).send(user.username + ' does not exist.')
      } else if (!user.email) {
        res.status(400).send(user.email + ' does not exist.')
      }
      console.log(user)
      res.json(user.username + ' successfully delted. ✅ ')
    })
})

app.use(express.static('public', options))
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send('We have a problem')
})
app.listen(3000)
