const http = require('http'),
    url = require('url'),
    fs = require('fs');

const server = http.createServer((req,res)=>{
  //get directory
  const localPath = __dirname;
  //URL and Timestamp logger
  let timeStamp = `URL: '${req.url}' |  Time-Stamp: ${new Date()}\r\n`;
  fs.appendFile(localPath + '/log.txt', timeStamp, (error)=>{
    if(!error){
      return console.log('No errors');
    }else{
      return console.log("error");
    }
  })
  // store url inside url object inside uri variable
  let uri = url.parse(req.url, true);
  //replace .html with empty string
  let URI = uri.pathname.replace('.html', '')
  switch(URI){
    case '/documentation':
        fs.readFile(localPath + '/documentation.html', 'utf-8', function(err, contents){
          if(err){res.writeHead(500);res.end()}
          res.end(contents)
        });
        break;
    default:
      fs.readFile(localPath + '/index.html', 'utf-8', function(err, contents){
        if(err){res.writeHead(500);res.end()}
        res.end(contents)
      });
      break;
  }
})
server.listen(8080)
