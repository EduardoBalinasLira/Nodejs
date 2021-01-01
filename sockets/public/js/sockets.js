var socket = io();

        socket.on('connect', function(){
            console.log("Conectado al servidor");
        });

        socket.on('disconnect', function(){
            console.log("Perdimos conexion con el servidor");
        });

        socket.emit('enviarMensaje', {
            usuario: "Eduardo",
            mensaje: "Hola mundo"
        })

        socket.on('enviarMensaje', function(resp) {
            console.log('Servidor: ', resp);
        })