import {Products} from '../models/index.model.js';

// Función para crear productos 
export const newProducts = async (req, res) => {
    // Extraer Datos
    const {name, price} = req.body;
    try {
        const product =  new Products({
            name,
            price
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