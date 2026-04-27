import {Products} from '../models/index.model.js';

// Función para subir archivo
export const saveImageGroup = async (req, res, next) => {
  try {
    // DEBUGGING -> Validar que exista una imagen anterior
    // if(group.image){
    //   console.log(group.image);
    // }

    // DEBUGGING -> Verificar si estan subiendo una imagen nueva
    // if(req.file){
    //   console.log(req.file.filename);
    // }

    //📌 Paso 3: Crear el req.record para que el siguiente middleware lo use
    req.record = group;
    //📌 Paso 4: Pasar al siguiente Middleware updateImage()
    return next();
  } catch (error) {
    console.error("❌ Error en saveImageGroup:", error);
    req.flash("error", "Hubo un error procesando la imagen");
    return res.redirect("/dashboard");
  }
};




// Función para crear productos 
export const newProducts = async (req, res) => {
    // Extraer Datos
    const {name, price} = req.body;
    // Verifica si se subió una imagen
      let image = null;
      if (req.file) {
        image = req.file.filename;
      }

    try {
        const product =  new Products({
            name,
            price,
            image,
         });


        // Almacenar en la base de datos
        const newProduct = await product.save();
        res.status(201).json({
            newProduct,
            message: `Producto creado correctamente`
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}