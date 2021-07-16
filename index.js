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
  MOVIES RESOURCE
 */
 //GET ALL MOVIES
app.get('/movies', (req, res)=>{
  Movies.find().then(title=>res.json(title))
})

/* 
  REQUEST: GET
  RESPONSE: 
*/
app.get('/movies/:title', (req, res)=>{
  Movies.findOne({Title: req.params.title})
  .then((movie)=>{
      Genre.findOne({Name: movie.Genre.Name[0]})
      .populate('Movie').exec((err, genre) => {
        Object.keys(movie.Genre).forEach(function(key){
          //movie.Genre[key]
          //genre[key]
          if(movie.Genre[key] != genre.Name){
            console.log("👏 ")
            movie.Genre[key] = genre[key]
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
app.get('/genre/:genre', (req, res)=>{
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
  Director.find({"Name": req.params.name}).then(director=>res.json(director))
})

// app.get('/directors/:name', (req, res)=>{
  
//   //TODO remove Movies and use Director.
//   Movies.find({"Director.Name": req.params.name})
//     .then((director)=>{
      
//       //TODO response will be different
//       res.json(director[0].Director)
//     })
//     .catch((err)=>{
//       res.status(500).send('Error: ' + err)
//     })
// })

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
        Genre: {},
        Director: {
          Name: "Roland Emmerich",
          Bio: "Roland Emmerich (German pronunciation: [ˈʁoːlant ˈɛməʁɪç] (About this soundlisten); born 10 November 1955) is a German film director, screenwriter and producer, widely known for his science fiction films. His films, most of which are English-language Hollywood productions, have made more than $3 billion worldwide, including just over $1 billion in the United States, making him the country's 15th-highest-grossing director of all time.[1][2] He began his work in the film industry by directing the film The Noah's Ark Principle (1984) as part of his university thesis and also co-founded Centropolis Entertainment in 1985 with his sister. He is also known for directing the films such as Universal Soldier (1992), Stargate (1994), Independence Day (1996), Godzilla (1998), The Patriot (2000), The Day After Tomorrow (2004), 2012 (2009), and most recently, Midway (2019). He is a collector of art and an active campaigner for the LGBT community, and is openly gay.[3]",
          Birth: "1995",
          Death: ""
        },
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
