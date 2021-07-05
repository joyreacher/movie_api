const express = require('express'),
  morgan = require('morgan');
const app = express();

app.use(morgan('common'));

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

app.use((err, req, res, next)=>{
  console.log(err.stack);
  res.status(500).send('We have a problem');
});

app.listen(3000);