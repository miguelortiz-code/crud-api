import express from  'express'
import {routeHome} from './routes/index.routes.js';


const app  = express();


// Routing
app.use('/', routeHome);


//Puerto
app.listen(5000, () => {
        console.log(`✅ Servidor corriendo en la URL: ${`http://localhost`}:${5000}/`);
    });