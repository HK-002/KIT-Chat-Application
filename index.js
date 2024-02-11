//node server to handle socket.io connection
const io = require('socket.io')(8000,{
    cors:{
        origin: '*',
    }
});

const users = {};

io.on('connection', socket =>{
    
    socket.on('new-user-joined',client =>{
        console.log("New user",client);
        users[socket.id] = client;
        socket.broadcast.emit('user-joined', client);
    });
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message: message, client: users[socket.id]})
    });
    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})