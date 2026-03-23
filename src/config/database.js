import mongoose from "mongoose";



// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/restapis');

// Evento si la conexión falla
mongoose.connection.on('error',(error) =>{
    console.log(`❌ Error de conexión a ${'mongodb://localhost:27017/restapis'}: ${error}`);
})

// Conexion exitosa
mongoose.connection.once('open', () =>{
    console.log(`✅ Conexión exitosa a la base de datos ${'mongodb://localhost:27017/restapis'}`);
});

// Evento cuando se desconecta
mongoose.connection.on('disconnected', () =>{
    console.warn(`⚠️ Conexión a ${'mongodb://localhost:27017/restapis'}  cerrada`);
});