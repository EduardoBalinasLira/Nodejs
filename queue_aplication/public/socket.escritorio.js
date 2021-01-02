var socket = io();

socket.on("connect", function(){
    console.log("Conexion con el servidor");
});

socket.on("disconnect", function(){
    console.log("Desconectado del servidor");
});

var searchParams = new URLSearchParams( window.location.search );

if(!searchParams.has("escritorio")) {

    window.location = "index.html";
    throw new Error("El escritorio es necesario");

}

var escritorio = searchParams.get("escritorio")
var laber = $('small');

$('h1').text("Escritorio " + escritorio);   

$('button').on('click', function() { 
    socket.emit('atenderTicket', {escritorio: escritorio}, function(resp){ 

        if(resp === "No hay mas tickets") {
            label.text(resp)
            return;
        }

        laber.text("el ticket: " + resp.numero)
    });


})