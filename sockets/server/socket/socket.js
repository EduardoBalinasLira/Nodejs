const { io } = require('../server')

io.on("connection", (client) => {

    console.log("Usuario conectado");

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido'
    })

    client.on('disconnect',()=> {
        console.log("Usuario desconectado");
    });

    //Escuchar cliente
    client.on('enviarMensaje', (mensaje) => {
        console.log(mensaje);

        client.broadcast.emit('enviarMensaje', mensaje)
    })


})