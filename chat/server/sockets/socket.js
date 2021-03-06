const { io } = require('../server');
const { Usuarios } = require('../classes/usuario');
const { crearMensaje } = require('../utils/utilidades')

const usuario = new Usuarios();

io.on('connection', (client) => {

   client.on('entrarChat', (data, callback) => {

       if( !data.nombre || !data.sala) {

           return callback({
               error: true,
               mensaje: 'El nombre/sala es necesario'
           });
       }

       client.join(data.sala);

       usuario.agregarPersona(client.id, data.nombre, data.sala);

       client.broadcast.to(data.sala).emit('listaPersona', usuario.getPersonasPorSala(data.sala));

       callback(usuario.getPersonasPorSala( data.sala ));

   });

   client.on('crearMensaje', (data) => {

       let persona = usuario.getPersona(client.id);
       let mensaje = crearMensaje(persona.nombre, data.mensaje);

       client.broadcast.to(persona.sala).emit('crearMensaje', mensaje)


   });

   client.on('disconnect', () => {

       let personaBorrada = usuario.borrarPersona( client.id );

       client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${ personaBorrada.nombre } salio`))
       client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuario.getPersonasPorSala(personaBorrada.sala));
 
   });

   //Mensaje privado

   client.on('mensajePrivado', data => {

        let persona = usuario.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje))

   })


});