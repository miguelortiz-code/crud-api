import express from  'express'

const app  = express();


//Puerto
app.listen(5000, () => {
        console.log(`✅ Servidor corriendo en la URL: ${`http://localhost`}:${5000}/`);
    });