var fs = require('fs');
var path = require('path');
var http = require('http');
var express = require('express');
var app = express();

var PORT = process.env.PORT || 5000;
const users = {};
const pictures = {};


const io = require('socket.io')(3000);
io.on("connection", socket => {
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    });
    socket.on('profile', picture => {
        pictures[socket.id] = picture;
        socket.broadcast.emit('user picture', picture);
    });
    socket.on('send-chat-message', message =>{
        socket.broadcast.emit('chat-message', {message: message, name: users[socket.id], picture: pictures[socket.id]});
    })
});

if(process.env.PORT != null){
    PORT = process.env.PORT;
}else{
    PORT = 5000;
}


//now do stuff using express for all static files.


app.use(express.static('public'));
/*
 * get the homepage.
 */
app.get('/', function(req, res, next){
    
    res.status(200).sendFile(path.join(__dirname, 'public_html/index.html'));
});

//get everything else
app.get('*', function (req, res) {
    console.log(req.url);
  res.status(200).sendFile(path.join(__dirname, 'public_html', req.url));
});

//just check it out.
app.listen(PORT, function () {
  console.log("== Server is listening on port", PORT);
});
