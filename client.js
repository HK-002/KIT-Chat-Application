const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('sound.mp3');

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
    audio.play();
    }
    
}

const client = prompt("Enter your name to join");
socket.emit('new-user-joined', client)

socket.on('user.joined', client =>{
  append(`${client} joined the chat`,'right')

})
socket.on('receive', data =>{
  append(`${data.client}:${data.message}`,'left')
})
socket.on('left', client =>{
  append(`${client} left the chat`,'right')
})


form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`,'right');
  socket.emit('send',message);
  messageInput.value = ''

})