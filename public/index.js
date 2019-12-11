// Variables ---------------------------------
var newPost = document.getElementById("send");
var msgToSend = document.getElementById("chatbox-id");
var posts = document.getElementsByClassName("message")
var postsContainer = document.getElementById("message-display");
var name = document.getElementById("dark-mode-user-name").textContent;
var picture ='https://icon-library.net/images/tumblr-avatar-icon/tumblr-avatar-icon-26.jpg';
var c = ['#beef00', '#ff0028', '#f2d53c', '#ffaaab', '#51d0de', '#DCC7AA', '#F7C331', '#c2dde6'];
var col, off = '1';
var messagesName = document.getElementById('nameBenny');
var messagesBenny = document.getElementById('post-text');
var pictureBenny = document.getElementById('pictureBenny');

// JSON for post
var data = {
    "text": "Hey! Welcome to Benny Chan! Enjoy your stay.",
    "name": "Benny Chan",
    "image": "https://images-na.ssl-images-amazon.com/images/I/314e1jgfh0L.jpg"
  };
  messagesName.textContent = data.name;
  messagesBenny.textContent = data.text;
  pictureBenny.src = data.image;

// Socket io ---------------------------------
const socket = io('http://localhost:3000');
const messageForm = document.getElementById("chatbox-sender");

// Sending data ---------------------------------

socket.emit('new-user', roomName, name);
socket.emit('profile', roomName, picture);

// Using data object ---------------------------------

socket.on('chat-message', data =>{
    posts = document.getElementsByClassName("message");
    if(posts.length === 100){
        posts[0].remove();
    }
    var name = document.getElementById("dark-mode-user-name").textContent;
    insertNewPost(data.message, data.name, data.picture, col);
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

// Functions ---------------------------------

// plays message notify sound
function playSound() {
    var sound = document.getElementById("audio");
    if(off === '1')
        sound.play();
    
}

// mute sound, toggles and changes text content
function muteSound() {
    var s = document.getElementById('sound');
    if(off === '1'){
        off = '0';
        s.textContent = 'Toggle Sound (Muted)'
    }
    else{
        off = '1';
        s.textContent = 'Toggle Sound'
    }
}

// animation for hamburger menu/transition
function onClickMenu(){
	document.getElementById("menu").classList.toggle("change");
	document.getElementById("nav").classList.toggle("change");
	document.getElementById("menu-bg").classList.toggle("change-bg");
}

// dark mode switch
function darkMode(){
    document.getElementById("body").classList.toggle("dark_mode");
    document.getElementById("site-user-info").classList.toggle("dark_mode_name");
    document.getElementById("dark-mode-user").classList.toggle("dark_mode_label");
    document.getElementById("dark-mode-user-name").classList.toggle("dark_mode_label");
    document.getElementById("dark-mode-send").classList.toggle("dark_mode_label");
}

// empties modal
function clearModal(){
    document.getElementById('username-input').value = '';
    document.getElementById('profile-photo-url').value = '';
}

// closes modal
function closeModal() {
    var modalBackground = document.getElementById('modal-background');
    var modalContent = document.getElementById('modal-content');
    modalBackground.style.display = 'none';
    modalContent.style.display = 'none';
}

// cancels modal
function cancelModal() {
    document.getElementById('username-input').value = 'Anon';
    document.getElementById('profile-photo-url').value = 'https://images-na.ssl-images-amazon.com/images/I/314e1jgfh0L.jpg';
    closeModal();
}

// display modal
function ShowModal() {
    var modalBackground = document.getElementById('modal-background');
    var modalContent = document.getElementById('modal-content');

    clearModal();

    modalBackground.style.display = 'block';
    modalContent.style.display = 'block';
}

// Gets data from modal
function profileInputHandle(event) {
     
    document.getElementById("dark-mode-user-name").textContent = document.getElementById('username-input').value;
    name = document.getElementById("dark-mode-user-name").textContent;
    console.log('username ==', name);
    picture = document.getElementById('profile-photo-url').value || document.getElementById('profile-photo-file').value;
    socket.emit('profile', roomName, picture);
    socket.emit('new-user', roomName, name);
    clearModal();
    closeModal();
}

// runs event when clicking 'Change Username'
function onClickName() {
    /*
    document.getElementById("dark-mode-user-name").textContent = prompt("What do you want your name to be");
    picture = prompt("Link for image");
    name = document.getElementById("dark-mode-user-name").textContent;
    socket.emit('profile', picture);
    socket.emit('new-user', name);
    */
    var closeModal = document.getElementById('close-modal');
    var okProfile = document.getElementById('ok-profile');
    okProfile.addEventListener('click', profileInputHandle);
    closeModal.addEventListener('click', cancelModal);
    ShowModal();
    
}

// gives a random color to the user
function changeColor(){
    var i = Math.floor(Math.random() * 8);
    col = c[i];
}

// creating a new post, making sure everything is valid and popping data off the top if too many posts
newPost.addEventListener('click', e => {
    e.preventDefault();
    const message = msgToSend.value;
    posts = document.getElementsByClassName("message");
    if(msgToSend.value.length < 201 && msgToSend.value.length > 0){
        if(posts.length === 100){
            posts[0].remove();
        }
        playSound();
        insertNewPost(message, document.getElementById("dark-mode-user-name").textContent, picture, col);
        socket.emit('send-chat-message', roomName, message);
        msgToSend.value = '';
        event.stopPropagation();
    }else
        alert("Messages must be 200 or less characters and at least 1 character");

});

/// Standard insert html

function insertNewPost(m, n, p, c) {
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
  msg.style.color = c;
  info.appendChild(msg);
    
  postsContainer.appendChild(contents);
}