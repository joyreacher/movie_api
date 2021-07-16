/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
const Genre = Models.Genre;
const Director = Models.Director;
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
  Return a list 
    of ALL movies to the user
  Return data 
    ( description, genre, director, image URL, whether is's feature or not (bool))
    about a single movie by the title to the user
  Return data about a director
    (bio, birth year, death year)
    by Name
  Allow new users to register
  Allow users to 
    update their user info (username, password, email, date of birth)
  Allow users to 
    add a movie to ther list of favorites
  ALlow users to 
    remove a movie from their list of favorites
  Allow existing users 
    to deregister
 */


/**
  MOVIES RESOURCE
 */
 //GET ALL MOVIES
app.get('/movies', (req, res)=>{
  Movies.find()
    .then(movie=>{
      movie
      res.json(movie)
    })
})

/* 
  REQUEST: GET
  RESPONSE: 
*/
app.get('/movies/:title', (req, res)=>{
  Movies.findOne({Title: req.params.title})
  .then((movie)=>{
      Genre.findOne({Name: movie.Genre.Name})
      .populate('Genre').exec((err, genre) => {
        Object.keys(movie.Genre).forEach(function(key){
          
          //IF THE GENRE IN MOVIES DOESNT EQUAL GENRE NAME FROM CALLBACK FOR GENRE COLLECTION
          if(movie.Genre[key] != genre.Name){
            console.log("🍅")
            // console.log(movie.Genre.Description)
            movie.Genre.Description = genre[key][0]
          }
        })
      })
      Director.findOne({Name: movie.Director.Name})
      .populate('Director').exec((err, director) => {
        Object.keys(movie.Director).forEach(function(key){
          //movie.Genre[key]
          //genre[key]
          // console.log('this is the director' + director)
          if(movie.Director[key] != director.Name){
            console.log("👏 ")
            movie.Director[key] = director[key]
          }
        })
        res.json(movie)
      })
  })
  .catch((error)=>{
    console.log(error)
    res.status(500).send('Error: ' + error)
  })
})

//GET ALL GENRES
app.get('/genres', (req, res)=>{
  Genre.find().then(genre=>res.json(genre))
})

//GET A LIST OF MOVIES BY GENRE
app.get('/genres/:genre', (req, res)=>{
  Movies.find({"Genre.Name": req.params.genre})
    .then((movies)=>{
      res.json(movies)
    })
    .catch((err)=>{
      res.status(500).send('Error: ' + err)
    })
})

//RETURNS ALL DIRECTORS
app.get('/directors', (req, res)=>{
  Director.find().then(director=>res.json(director))
})

app.get('/directors/:name', (req, res)=>{
  // Director.find({"Name": req.params.name}).then(director=>res.json(director))  
  Director.findOne({Name: req.params.name})
  .then((director)=>{
      // console.log(director.Name)
      Movies.find({"Director.Name": director.Name})
      .populate('Director').exec((err, movie) => {
        Object.keys(movie).forEach(function(key){
          //movie.Genre[key]
          //genre[key]
          // if a movie that was directed by the searched director
          if(key){
            // console.log(movie[0].Director.Name[0])
            // console.log(director.Name)
            if(director.Name == movie[0].Director.Name[0]){
              console.log("👏 ")
              director.Bio = movie.Director
            } 
          }
      })
      // COMBINE THE TWO OBJECTS
      let target = Object.assign({}, director._doc, movie)
      res.json(target)
    })
    
    
  })
  .catch((error)=>{
    console.log(error)
    res.status(500).send('Error: ' + error)
  })

})

app.post('/movies', (req, res)=>{
  console.log(req.body)
  Movies.create(
    {
      Title: req.body.Title,
      Description: req.body.Description,
      Genre: {"Name":req.body.Genre, "Description": ""},
      Director: { "Name": req.body.Director, "Bio":"This is a test bio"},
      ImagePath: req.body.Image,
      Featured: req.body.Featured
    }
  )
  .then((movie) =>{res.status(201).json(movie) })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  })
  // res.send('POST create a movie resource.')
})
//! USED TO UPDATE TO REMOVE GENRE OBJECT
app.put('/movies/:title', (req, res)=>{
  console.log(req.body)
  console.log(req.params)
  Movies.findOneAndUpdate( {title: req.body.title }, {$set:
      {
        Title: req.params.title,
        Description: "During a nuclear test, the French government inadvertently mutates a lizard nest; years later, a giant lizard makes its way to New York City. Dr. Niko Tatopoulos, an expert on the effects of radiation on animals, is sent by the U.S. government to study the beast. When the creature, dubbed 'Godzilla' by news outlets, emerges, a massive battle with the military begins. To make matters worse, Niko discovers that Godzilla has laid a nest of 200 eggs, which are ready to hatch.",
        Genre:{"Name":"Sci-Fi"},
        Director: {"Name": "Roland Emmerich"},
        ImagePath:"godzilla.png",
        Featured: false
      }
    },
    { new: true },
    (err, updatedMovie)=>{
      if(err){
        console.log(err)
        res.status(500).send('Error:' + err)
      }else{
        res.json(updatedMovie)
      }
    }
  )
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
  
  app.delete('/users/:username', (req, res)=>{
    Users.findOneAndRemove( { username: req.params.username } )
      .then((user)=>{
        if(!user){
          res.status(400).send(req.params.username + ' was not found')
        }else{
          res.status(200).send(req.params.username + ' was deleted')
        }
      })
      .catch((err)=>{
        console.log(err)
        res.status(500).send('Error: ' + err)
      })
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
