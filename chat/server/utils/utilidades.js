const crearMensaje = ( nombre, mensaje ) => {

    let now = new Date();
    return {
        nombre,
        mensaje,
        fecha: new Date(now).getTime()
    }
}

module.exports = {
    crearMensaje
}