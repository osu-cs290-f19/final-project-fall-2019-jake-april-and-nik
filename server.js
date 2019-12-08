var fs = require('fs');
var http = require('http');
var PORT = 5000;
const users = {};

const io = require('socket.io')(3000);
io.on("connection", socket => {
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    });
    socket.on('send-chat-message', message =>{
        socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]});
    })
});

if(process.env.PORT != null){
    PORT = process.env.PORT;
}else{
    PORT = 5000;
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