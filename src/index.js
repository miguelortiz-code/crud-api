import express from  'express'
import {routeHome, customerRouter} from './routes/index.routes.js';
import './config/database.js';


const app  = express();

// Habilitar lectura de datos en formularios
app.use(express.urlencoded({extended: true}));

// Routing
app.use('/', routeHome);
app.use('/customers', customerRouter);


//Puerto
app.listen(5000, () => {
        console.log(`✅ Servidor corriendo en la URL: ${`http://localhost`}:${5000}/`);
    });