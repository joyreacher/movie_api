//1
const express = require('express'),
  morgan = require('morgan');
const app = express();

//5
app.use(morgan('common'));
//2
const movies ={
  title:[
    {
      name:'Ths Shining',
    },
    {
      name:'Ths Sandlot',
    },
    {
      name:'Ths Happening',
    },
    {
      name:'Ths Thing',
    },
    {
      name:'Ths Fog',
    },
    {
      name:'Ths Shining',
    },
    {
      name:'Boss baby',
    },
    {
      name:'Bee Movie',
    },
    {
      name:'Godzilla',
    },
  ]
};
app.get('/movies', function(req, res){res.json(movies.title);});
//3
app.get('/', (req, res)=>{res.send('<h1>This route exists!!</h1>');});

const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  fallthrough:false,
  lastModified:true,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
};
//4
app.use(express.static('public', options));
// app.get('/documentation', (req, res)=>{res.sendFile(__dirname + '/public');});
app.use((err, req, res, next)=>{
  console.log(err.stack);
  res.status(500).send('We have a problem');
});
app.listen(3000);