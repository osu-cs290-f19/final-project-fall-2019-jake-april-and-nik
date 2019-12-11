var newPost = document.getElementById("send");
var msgToSend = document.getElementById("chatbox-id");
var posts = document.getElementsByClassName("message")
var postsContainer = document.getElementById("message-display");

const socket = io('http://localhost:3000');
const messageForm = document.getElementById("chatbox-sender");
var name = document.getElementById("dark-mode-user-name").textContent;
var picture ='https://icon-library.net/images/tumblr-avatar-icon/tumblr-avatar-icon-26.jpg';
socket.emit('new-user', name);
socket.emit('profile', picture);

socket.on('chat-message', data =>{
    posts = document.getElementsByClassName("message");
    if(posts.length === 100){
        posts[0].remove();
    }
    var name = document.getElementById("dark-mode-user-name").textContent;
    insertNewPost(data.message, data.name, data.picture);
});

function playSound() {
    var sound = document.getElementById("audio");
    sound.play();
}

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
function closeModal() {
    var modalBackground = document.getElementById('modal-background');
    var modalContent = document.getElementById('modal-content');
    modalBackground.style.display = 'none';
    modalContent.style.display = 'none';
}

function clearModal() {
    console.log('in clear modal');
    document.getElementById('username-input').value = '';
    document.getElementById('profile-photo-url').value = '';
}

function cancelModal() {
    console.log('in cancel modal');
    document.getElementById('username-input').value = 'Anon';
    document.getElementById('profile-photo-url').value = 'https://icon-library.net/images/tumblr-avatar-icon/tumblr-avatar-icon-26.jpg';
    closeModal();
}

function ShowModal() {
    console.log('in show modal');
    clearModal();
    var modalBackground = document.getElementById('modal-background');
    var modalContent = document.getElementById('modal-content');
    var cancel = document.getElementById('close-modal');
    cancel.addEventListener('click', cancelModal);
    modalBackground.style.display = 'block';
    modalContent.style.display = 'block';
}

function profileInputHandle(event) {
   
    document.getElementById("dark-mode-user-name").textContent = document.getElementById('username-input').value;
    picture = document.getElementById('profile-photo-url').value;
    name = document.getElementById("dark-mode-user-name").textContent;
    socket.emit('profile', picture);
    socket.emit('new-user', name);

    closeModal();
}

function onClickName() {
    ShowModal();
    var okProfile = document.getElementById('ok-profile');
    okProfile.addEventListener('click', profileInputHandle);
}

newPost.addEventListener('click', e => {
    e.preventDefault();
    const message = msgToSend.value;
    posts = document.getElementsByClassName("message");
    if(msgToSend.value.length < 201 && msgToSend.value.length > 0){
        if(posts.length === 100){
            posts[0].remove();
        }
        playSound();
        insertNewPost(message, document.getElementById("dark-mode-user-name").textContent, picture);
        socket.emit('send-chat-message', message);
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