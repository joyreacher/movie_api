/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
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

app.get('/', (req, res) => {
  res.send('Successful GET request return data on all movies and user information.')
})

app.get('/users', function (req, res) {
  res.send('Successful GET request return data on all users object')
})


app.get('/content', function (req, res) {
  res.send('Successful GET request. Return all movie and filmography data.')
})

/*
  MOVIES
*/
app.get('/content/movies', (req, res) => {
  res.send('Successful GET request returns all movies with its url.')
})

app.get('/content/movies/:genre', (req, res) => {
  res.send('Successful GET request returns all movies based on their genre value.')
})

app.get('/content/movies/filmography/:title/:name', (req, res) => {
  res.send('Successful GET request returns actor or director by name')
})

app.post('/content/movies/mymovies', (req, res) => {
  res.send('Successful POST request to update the mymovies list.')
})

app.delete('/content/movies/mymovies', (req, res) => {
  res.send("Successful DELETE request to remove a movie from mymovies array.")
})

/*
  ACCOUNT
*/
app.post('/content/account/register', (req, res) => {
  res.send('Successful POST request to add a user.')
})

app.delete('/content/account/unregister/:email', (req, res) => {
  res.send('Successful DELETE request to remove a user.')
})

app.put('/content/account/myinfo?:name', (req, res) => {
  res.send('Successful PUT request to change a users username.')
})

/*
  MOVIE
*/
app.get('/content/movie/details/:id', (req, res) => {
  res.send('Successful GET request to retrieve detail about a specific movie.')
})

app.use(express.static('public', options))
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send('We have a problem')
})
app.listen(3000)
