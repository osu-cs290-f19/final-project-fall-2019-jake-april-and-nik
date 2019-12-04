var fs = require('fs');
var http = require('http');
var PORT = 3000;

if(process.env.PORT != null){
    PORT = process.env.PORT;
}else{
    PORT = 3000;
}

var idx = fs.readFileSync('./public_html/index.html', 'utf-8');
console.log("Reading index");
var styl = fs.readFileSync('./public_html/stylesheet.css', 'utf-8');
console.log("Reading css");
var js = fs.readFileSync('./public_html/index.js', 'utf-8');
console.log("Reading js");




var server = http.createServer(function(req, res){
    console.log('request was made: ' + req.url);
    if(req.url  === '/index.html' || req.url === '/' ){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(idx);
        res.end();
        //fs.createReadStream(__dirname + '/public/index.html').pipe(res);
    }else if(req.url === '/stylesheet.css'){
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(styl);
        res.end();    
    }else if(req.url === '/index.js'){
        res.writeHead(200, {'Content-Type': 'text/js'});
        res.write(js);
        res.end();    
    }
});

server.listen(PORT, '127.0.0.1');



console.log('listening to ', PORT);