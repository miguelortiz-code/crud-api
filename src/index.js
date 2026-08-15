import express from  'express'
import cors from 'cors'
import {routeHome, customerRouter, productsRouter, ordersRouter} from './routes/index.routes.js';
import './config/database.js';


const app  = express();

// Habilitar lectura de datos en formularios
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Habilitación de CORS
app.use(cors());


// public folder
app.use('/uploads', express.static('src/public/uploads'));

// Routing
app.use('/', routeHome);
app.use('/', customerRouter);
app.use('/', productsRouter);
app.use('/', ordersRouter);


//Puerto
app.listen(5000, () => {
        console.log(`✅ Servidor corriendo en la URL: ${`http://localhost`}:${5000}/`);
    });