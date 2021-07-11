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

/**
  MOVIES RESOURCE
 */
app.get('/movies', (req, res)=>{
  res.send('GET request for a collection of movies.')
})

app.get('/movies/:movieid', (req, res)=>{
  res.send('GET all information based on movie id')
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
  app.get('/users/:id/movies', (req, res)=>{
    res.send('GET a the movies of a given user.')
  })
  
  app.post('/users/:id/movies', (req, res)=>{
    res.send('POST a new movie to the users favorites.')
  })
  app.put('/users/:id/movies/:movieid', (req, res)=>{
    res.send('POST a new movie to the users favorites.')
  })
  
app.use(express.static('/public', options))
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send('We have a problem')
})
app.listen(3000)
