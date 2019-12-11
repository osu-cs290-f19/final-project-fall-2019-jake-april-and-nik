var newPost = document.getElementById("send");
var msgToSend = document.getElementById("chatbox-id");
var posts = document.getElementsByClassName("message")
var postsContainer = document.getElementById("message-display");

const socket = io('http://localhost:3000');
const messageForm = document.getElementById("chatbox-sender");
var name = document.getElementById("dark-mode-user-name").textContent;
var picture ='https://icon-library.net/images/tumblr-avatar-icon/tumblr-avatar-icon-26.jpg';
socket.emit('new-user', roomName, name);
socket.emit('profile', roomName, picture);

socket.on('chat-message', data =>{
    posts = document.getElementsByClassName("message");
    if(posts.length === 4){
        posts[0].remove();
    }
    var name = document.getElementById("dark-mode-user-name").textContent;
    insertNewPost(data.message, data.name, data.picture);
});

socket.on('room-created', room=>{

    const roomElement = document.createElement('div');
    roomElement.innerText = room;
    const link = document.createElement('a');
    link.href = '/${room}';
    link.innerText = 'Join';
    document.getElementById('room-container').append(roomElement);
    document.getElementById('room-container').append(link);

});

function onClickMenu(){
	document.getElementById("menu").classList.toggle("change");
	document.getElementById("nav").classList.toggle("change");
	document.getElementById("menu-bg").classList.toggle("change-bg");
}

function darkMode(){

    document.getElementById("body").classList.toggle("dark_mode");
    document.getElementById("site-user-info").classList.toggle("dark_mode_name");
    document.getElementById("dark-mode-user").classList.toggle("dark_mode_label");
    document.getElementById("dark-mode-user-name").classList.toggle("dark_mode_label");
    document.getElementById("dark-mode-send").classList.toggle("dark_mode_label");
    
}

function onClickName(){
    document.getElementById("dark-mode-user-name").textContent = prompt("What do you want your name to be");
    picture = prompt("Link for image");
    name = document.getElementById("dark-mode-user-name").textContent;
    socket.emit('profile', roomName, picture);
    socket.emit('new-user', roomName, name);

}

newPost.addEventListener('click', e => {
    e.preventDefault();
    const message = msgToSend.value;
    posts = document.getElementsByClassName("message");
    if(msgToSend.value.length < 201 && msgToSend.value.length > 0){
        if(posts.length === 4){
            posts[0].remove();
        }
        insertNewPost(message, document.getElementById("dark-mode-user-name").textContent, picture);
        socket.emit('send-chat-message', roomName, message);
        msgToSend.value = '';
        event.stopPropagation();
    }else
        alert("Messages must be 200 or less characters and at least 1 character");

});

/// INSERT NEW MESSAGE BASIC NEEDS TEMPLATE

function insertNewPost(m, n, p) {
  var contents = document.createElement('div');
  contents.classList.add("message");
    
  var content = document.createElement('div');
  content.classList.add("message-content");
  contents.appendChild(content);
    
  var postPhotoImg = document.createElement('div');
  postPhotoImg.classList.add("message-profile-picture");
  content.appendChild(postPhotoImg);
    
  var name = document.createElement('p');
  name.classList.add("username");
  name.textContent = n;
  postPhotoImg.appendChild(name);
    
  var image = document.createElement('img');
  image.src=p;
  postPhotoImg.appendChild(image);

  var info = document.createElement('div');
  info.classList.add("message-info-holder");
  content.appendChild(info);
    
  var msg = document.createElement('p');
  msg.id = "post-text";
  msg.textContent = m;
  info.appendChild(msg);
    
  postsContainer.appendChild(contents);
}