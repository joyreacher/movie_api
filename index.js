/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
mongoose.connect('mongodb+srv://Brian:Takka__411@cluster0.ganu8.mongodb.net/myFlix?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
// mongodb+srv://Brian:<password>@cluster0.ganu8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
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

/**
  MOVIES RESOURCE
 */
app.get('/movies', (req, res)=>{
  Movies.find().then(title=>res.json(title))
  // res.json(Movies)
})

app.get('/movies/:movieid', (req, res)=>{
  res.send('GET all information based on movie id')
})

app.get('/movies/genre', (req, res)=>{
  res.send('GET a list of all movie genres.')
})

app.get('/movies/genre/:genre', (req, res)=>{
  res.send('GET a list of all movies of a specific genre.')
})

app.post('/movies', (req, res)=>{
  res.send('POST create a movie resource.')
})

app.put('/movies/:movieid', (req, res)=>{
  res.send('UPDATE a movie resource.')
})

app.delete('/movies/:movieid', (req, res)=>{
  res.send('DELETE a movie resource.')
})

/**
  USERS
 */
  //GET ALL USERS
  app.get('/users', (req, res)=>{
    //return all users
    Users.find()
      .then((users)=>{res.status(201).json(users)})
      .catch((error)=>{
        console.log(error)
        res.status(500).send('Error: ' + err)
      })
  })
  // GET A USER BASED ON USERNAME
  app.get('/users/:username', (req, res) => {
    console.log(req.params.username)
    Users.findOne({username: req.params.username})
      .then((user)=>{
        console.log(user)
        res.json(user)
      })
      .catch((error)=>{
        console.log(error)
        res.status(500).send('Error: ' + error)
      })
  })
  
  app.get('/users/:id/movies', (req, res)=>{
    res.send('GET a the movies of a given user.')
  })
  
  
  //ADD A USER
  app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users
            .create({
              username: req.body.Username,
              password: req.body.Password,
              email: req.body.Email,
              birthday: req.body.Birthday
            })
            .then((user) =>{res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  })
  
  // ADD A MOVIE TO USERS FAVORITES
  app.post('/users/:username/movies/:movieid', (req, res)=>{
    console.log(req.body)
    Users.findOneAndUpdate( { username: req.body.username },{
      $push: { favorite_movies: req.body.movieid}
      },
      {new: true},
      (err, updatedUser)=>{
        if(err){
          console.log(err)
          res.status(500).send('Error: ' + err)
        }else{
          res.json(updatedUser)
        }
      }
    )
  })
  
  
  // app.post('/users/:id/movies', (req, res)=>{
  //   res.send('POST a new movie to the users favorites.')
  // })
  
  app.put('/users/:username', (req, res)=>{
    console.log(req.body)
    Users.findOneAndUpdate( {username: req.params.username }, {$set:
        {
          username: req.body.Username,
          password: req.body.Password,
          email: req.body.Email,
          birth_date: req.body.Birthday
        }
      },
      { new: true },
      (err, updatedUser)=>{
        if(err){
          console.log(err)
          res.status(500).send('Error:' + err)
        }else{
          res.json(updatedUser)
        }
      }
    )
  })
  
  app.put('/users/:id/movies/:movieid', (req, res)=>{
    res.send('POST a new movie to the users favorites.')
  })
  
  /**
  DIRECTORS
 */
  app.get('/directors', (req, res)=>{
    res.send('GET ')
  })
  
  app.get('/directors/:directorid', (req, res)=>{
    res.send('GET all information about a director based on id.')
  })
  
  app.post('/directors', (req, res)=>{
    res.send('POST a new director resource.')
  })
  
  app.put('/directors/:directorid', (req, res)=>{
    res.send('UPDATE a director resource.')
  })
  
  app.delete('/directors/:directorid', (req, res)=>{
    res.send('DELETE a director resource.')
  })
  
app.use(express.static('/public', options))
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send('We have a problem')
})
app.listen(3000)
