/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// 1
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
// 5
app.use(morgan('common'))
// 2
app.get('/movies', function (req, res) { res.json(movies.title) })
// 3
app.get('/', (req, res) => { res.send('<h1>This route exists!!</h1>') })
// 4
app.use(express.static('public', options))
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send('We have a problem')
})
app.listen(3000)
