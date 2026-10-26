import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { routeHome, customerRouter, productsRouter, ordersRouter, authRouter } from './routes/index.routes.js';
import './config/database.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Definir dominio(s) permitidos
const whiteList = [
    process.env.FRONTEND_URL,
].filter(Boolean);

const corsOptions = {
    origin: (origin, callback) => {
        // Permitir peticiones sin origin (Postman, Thunder Client, server-to-server)
        if (!origin) return callback(null, true);

        if (whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true
};

// Habilitación de CORS (antes que todo lo demás)
app.use(cors(corsOptions));

// Lectura de datos en formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Carpeta pública
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routing
app.use('/', routeHome);
app.use('/', customerRouter);
app.use('/', productsRouter);
app.use('/', ordersRouter);
app.use('/', authRouter);

// Manejo de errores (siempre al final)
app.use((err, req, res, next) => {
    if (err.message === 'No permitido por CORS') {
        return res.status(403).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}/`);
});