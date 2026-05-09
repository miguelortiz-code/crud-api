import fs from "fs";
import path from "path";
import {Products} from '../models/index.model.js';

// Funcion para almacenar y editar imagen de los productos
// export const saveImageGroup = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     const product = await Products.findById(id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: 'Producto no existe',
//       });
//     }

//     req.record = product;
//     return next();
//   } catch (error) {
//     console.error('Error en saveImageGroup:', error);
//     return res.status(500).json({ 
//       success: false,
//       message: error.message 
//     });
//   }
// };

// Crear producto con imagen
export const newProducts = async (req, res) => {
  try {
    const { name, price } = req.body;

    //Validar campos requeridos antes de guardar
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: 'Nombre y precio son requeridos',
      });
    }

    const product = new Products({
      name,
      price,
      image: req.file ? req.file.filename : null,
    });

    const newProduct = await product.save();

    return res.status(201).json({
      success: true,
      data: newProduct,
      message: 'Producto creado correctamente',
    });

  } catch (error) {
    return res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Función para mostrar todos los productos
export const getAllProducts = async (req, res) =>{
  try {
    const products = await Products.find();
    res.status(200).json({
      products,
    }) 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Función para obtener producto por su id
export const  getProductById = async (req, res) =>{
  try {
    const {id } = req.params;
    const product = await Products.findById(id);
    
    if(!product){
      return res.status(404).json({
        success: false,
        message: 'Producto no existe'
      });
    }

    // Si todo está bien
    return res.status(200).json({
      success: true,
      data: product,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// función para actualizar productos
export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const previousProduct = await Products.findById(id);

    if (!previousProduct) {
      return res.status(404).json({
        success: false,
        message: 'Producto no existe',
      });
    }

    // Construir nuevo producto
    let newProduct = req.body;

    //Primero verifica que req.file exista, luego su filename
    if (req.file) {
      newProduct.image = req.file.filename;
    } else {
      newProduct.image = previousProduct.image; // Conserva la imagen anterior
    }

    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      { $set: newProduct },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      data: updatedProduct,
      message: 'Producto actualizado correctamente',
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Función para eliminar productos
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Products.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Producto no existe',
      });
    }

    // Si hay imagen asociada, eliminarla
    if (deletedProduct.image) {
      const oldImagePath = path.join(
        import.meta.dirname,
        '..',
        'public',
        'uploads',
        'products',
        deletedProduct.image
      );

      try {
        await fs.promises.unlink(oldImagePath);
      } catch (err) {
        if (err.code !== 'ENOENT') {
          console.error('⚠ Error eliminando imagen:', err);
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: `Producto ${deletedProduct.name} ha sido eliminado`,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};