/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express'); const morgan = require('morgan')
const app = express()
const movies = {
  title: [
    {
      name: 'Ths Shining'
    },
    {
      name: 'Ths Sandlot'
    },
    {
      name: 'Ths Happening'
    },
    {
      name: 'Ths Thing'
    },
    {
      name: 'Ths Fog'
    },
    {
      name: 'Ths Shining'
    },
    {
      name: 'Boss baby'
    },
    {
      name: 'Bee Movie'
    },
    {
      name: 'Godzilla'
    }
  ]
}
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

app.get('/movies', function (req, res) { res.json(movies.title) })
// get all movies
app.get('/', (req, res) => { res.send('<h1>This route shows all the movies</h1>') })
// return details of a movie
app.get('/content/movies/details/:title', (req, res) => { res.send(`<h1>This route will contain movie details about '${req.params.title}'.</h1>`) })
// return a specific genre
app.get('/content/movies/movielist?:genre', (req, res, next) => {
  const genere = req.query.genre
  res.send(`<h1>${genere.toLocaleUpperCase()}</h1>`)
})
// return director
app.get('/content/movies/filmography/:name', (req, res) => { res.send(`<h1>This route will show details about ${req.params.name}</h1>`) })
// register a user
app.post('/content/movies/register', (req, res) => {
  // store what is entered through a form field
  // form input fields need to have corresponding names
  const { email, name, password } = req.body
  res.json(`${name} is trying to register..`)
})
// make changes to a user's account
app.put('/content/account/myinfo?:username', (req, res) => { res.json(` '${req.query.username}' is the value that will be used to update a user's profile.`) })
// add a movie to a users favorite movies
app.post('/content/movies/mymovies', (req, res) => {
  // will need to add form encodeurl/escape special characters
  // express-validator = ?
  const { title, description } = req.body
  res.send(`<h1>Need to escape input values ${title}</h1> \n<h1>here is the description: ${description}</h1>`)
})
// remove a movie from the users favorite movies
app.delete('/content/movies/mymovies', (req, res) => {
  const { title, description } = req.body
  // will need to add form encodeurl/escape special characters
  // express-validator = ?
  res.json(`<h1>deleting ${title}</h1>`)
})

app.use(express.static('public', options))
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send('We have a problem')
})
app.listen(3000)
