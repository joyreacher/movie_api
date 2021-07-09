/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express'); const morgan = require('morgan')
const app = express()
const db = require('./public/js/db.js')
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

// returns main users object
app.get('/users', function (req, res) {
  res.json(db.users)
})
// return main content object
app.get('/content', function (req, res) {
  res.json(db.content)
})
// return the entire db object
app.get('/', (req, res) => {
  // ? res.send(db.content.movies[0])
  res.send(db)
})
// return all movies
app.get('/content/movies', (req, res) => {
  res.send(db.content.movies)
})
// return details of a movie
app.get('/content/movie/details/:id', (req, res) => {
  const id = req.params.id
  res.send(db.content.movie[id])
})
// return a specific genre
app.get('/content/movies/:genre', (req, res) => {
  // get the value from the url
  const genre = req.params.genre
  // return the array of objects with title and url values
  switch (genre) {
    case 'comedy':
      res.send(db.content.genre.comedy)
      break
    case 'action':
      res.send(db.content.genre.action)
      break
    case 'sci-fi':
      res.send(db.content.genre.sci - fi)
      break
    case 'drama':
      res.send(db.content.genre.drama)
      break
    case 'horror':
      res.send(db.content.genre.horror)
      break
  }
})
// return director
app.get('/content/movies/filmography/:title/:name', (req, res) => {
  //! req.params.name --- to access the name

  // store url parameters
  const { title, name } = req.params

  if (title === 'director') {
    db.content.filmography.director.forEach(director => {
      if (director.name === name) {
        res.send(director)
      }
    })
  } else if (title === 'actor') {
    db.content.filmography.actor.forEach(actor => {
      if (actor.name === name) {
        res.send(actor)
      }
    })
  }
  // if parameter passed does not exist return the entire filmography array
  else {
    res.send(db.content.filmography)
  }
})
// register a user
app.post('/content/account/register', (req, res) => {
  // store what is entered through a form field
  // form input fields need to have corresponding names
  const { email, name, password } = req.body
  db.users.myinfo.push({
    id: '1', // for loop to increment the id number here
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  })
  // returns the added user object (the last object in the array)
  res.json(db.users.myinfo[db.users.myinfo.length - 1])
})
// unregister user
app.delete('/content/account/unregister/:email', (req, res) => {
  // get the email value (req.body.email)
  // compare email value to (db.users.myinfo[iterator].email) array collection
  res.json(`Find the user withe the corresponding email '${req.body.email}' and delete them`)
})

// make changes to a user's account
app.put('/content/account/myinfo?:name', (req, res) => {
  // get value in query parameter
  const { name } = req.query
  // use foreach to iterate through the array of users
  db.users.myinfo.forEach(user => {
    // if a username matches
    if (user.name === name) {
      //! DOES NOT WORK IN THE  BROWSER -- NO FILE OR DIRECTORY AT /CONTENT/ACCOUNT/MYINFO.HTML
      //! DOES UPDATE IN POSTMAN
      user.username = 'ThisUserNameIsHardCoded'
      return res.json(user)
    }
  })
})
// add a movie to a users favorite movies
app.post('/content/movies/mymovies', (req, res) => {
  // will need to add form encodeurl/escape special characters --- express-validator = ?

  // data that is sent through an input field assigned to values
  const { title } = req.body
  // search through the movies array
  db.content.movies.forEach(movie => {
    // if that movie exists in the array
    if (movie.title === title) {
      // add it to mymovies
      db.users.myinfo[0].mymovies.push({
        title: title,
        // get the url from the movies array-object
        url: movie.url
      })
      res.send(db.users.myinfo[0])
    }
  })
})
// remove a movie from the users favorite movies
app.delete('/content/movies/mymovies', (req, res) => {
  const { title, description } = req.body
  // will need to add form encodeurl/escape special characters
  // express-validator = ?
  // res.json(`<h1>deleting ${title}</h1>`)

  // iterate through each movie
  db.users.myinfo[0].mymovies.forEach(movie => {
    if (movie.title === title) {
      res.send(`remove ${title}`)
    }
  })
})

app.use(express.static('public', options))
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send('We have a problem')
})
app.listen(3000)
