import express from  'express'
import cors from 'cors'
import {routeHome, customerRouter, productsRouter, ordersRouter, authRouter} from './routes/index.routes.js';
import './config/database.js';


const app  = express();

// Habilitar lectura de datos en formularios
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Definir un dominio(s) para recibir las peticiones
const whiteList = [
    process.env.FRONTEND_URL,   // ej: https://mi-app.vercel.app
    'http://localhost:5173'     // Vite por defecto (o 3000 si usas CRA)
].filter(Boolean);

const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin)
        // Permitir peticiones sin origin (Postman, Thunder Client, server-to-server)
        if (!origin) return callback(null, true);

        const existe = whiteList.includes(origin);
        if (existe) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true // solo si envías cookies o headers de auth con credentials
};

// Habilitación de CORS
app.use(cors(corsOptions));


// public folder
app.use('/uploads', express.static('src/public/uploads'));

// Routing
app.use('/', routeHome);
app.use('/', customerRouter);
app.use('/', productsRouter);
app.use('/', ordersRouter);
app.use('/', authRouter);


//Puerto
app.listen(5000, () => {
        console.log(`✅ Servidor corriendo en la URL: ${`http://localhost`}:${5000}/`);
    });