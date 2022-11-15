const path= require('path');
const express = require('express')
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const readline= require("readline");
const fs= require("fs");

app.use(express.static('public'));

io.on('connection', (socket) =>{
    console.log('Nueva conexión', socket.id);
    
    socket.on('datos', datos =>{
        io.emit('datos', datos);
    });
    
    socket.on('disconnect',() =>{

        console.log('socket desconectado', socket.id);
        io.emit('socket-desconectado', {
            texto: 'socket desconectado',
            id: socket.id,
        });
    });

    socket.on('chat:mensaje', (data)=>{

        io.emit('chat:mensaje', data);
    }
    );

    socket.on('chat:escribiendo', (usuario) =>{

        socket.broadcast.emit('chat:escribiendo', usuario);
    })
});

PORT = process.env.PORT || 
server.listen(PORT, () =>{
    console.log('Servidor en el puerto 3000')
});





