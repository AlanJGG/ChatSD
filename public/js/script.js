//var socket = io;

var socket = io.connect();
var list = document.querySelector('#not');
let mensaje = document.getElementById('mensaje');
let usuario = document.getElementById('usuario');
let salida= document.getElementById('salida');
let notificaciones = document.getElementById('notificaciones')
let boton = document.getElementById('enviar');

var clientes=[]

boton.addEventListener('click', function(){

    var data = {

        mensaje: mensaje.value,
        usuario: usuario.value,
    }
    if (mensaje.value===' ' || usuario.value=== ' ') {
        alert('Se requiere un usuario y un mensaje para poder ingresar al chat');

    }else{
        mensaje.value= ' ';
        socket.emit('chat:mensaje', data);
    }
});

mensaje.addEventListener('keydown', function(){

    socket.emit('chat:escribiendo', usuario.value);
});

socket.on('chat:mensaje', function(data){

    salida.innerHTML+=
    '<b>' + data.usuario+ '<b>: '+ data.mensaje+ '<br>';
    notificaciones.innerHTML = '';
});

socket.on('chat:escribiendo', function(data){
        notificaciones.innerHTML= '<p><em>' + data + '<em> está escribiendo...<p>';


});

socket.on('socket-desconectado', function(data){

    console.log(data);
    clientes= clientes.filter(function(cliente){

        console.log(cliente);
        return cliente.id != data.id;
    });
});




