const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));

const rooms = {};

app.get('/', (req, res) =>{

    res.render('index', {rooms: rooms});

});

app.post('/room', (req, res) =>{

    if(rooms[req.body.room] != null){
        return res.redirect('/');
    }
    rooms[req.body.room] = { users: {}, pictures: {}};
    res.redirect(req.body.room);

    io.emit('room-created', req.body.room);

});

app.get('/:room', (req, res) =>{
    if(rooms[req.params.room] == null){
        return res.redirect('/');
    }
    res.render('room', { roomName: req.params.room});

});

server.listen(3000);

io.on("connection", socket => {
    socket.on('new-user', (room, name) => {
        socket.join(room);
        rooms[room].users[socket.id] = name;
        socket.to(room).broadcast.emit('user-connected', name);
    });
    socket.on('profile', (room, picture) => {
        rooms[room].pictures[socket.id] = picture;
        socket.to(room).broadcast.emit('user picture', picture);
    });
    socket.on('send-chat-message', (room, message) =>{
        socket.to(room).broadcast.emit('chat-message', {message: message, name: rooms[room].users[socket.id], picture: rooms[room].pictures[socket.id]});
    })
});





