const express = require('express'),
  morgan = require('morgan');
const app = express();

app.use(morgan('common'));


app.get('/', function(req, res){res.send('success');});

app.use((err, req, res, next)=>{
  console.log(err.stack);
  res.status(500).send('We have a problem');
});

app.listen(3000);