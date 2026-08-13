import {Customers} from '../models/index.model.js';

// Función para crear usuarios
export const newCustomer = async (req, res) =>{
    // Extraer datos
    const {name, lastname, company, email, telefono} = req.body
    try {
        const customer = new Customers({
            name,
            lastname,
            company,
            email,
            telefono
        });
        // Almacenar en la base de datos
        const newCustomer =  await customer.save();
        res.status(201).json(
            {
                newCustomer,
                message: 'Se ha creado un nuevo cliente'
            });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: `El correo ya se encuentra registrado`
            });
        }
        res.status(500).json({ message: error.message });
    }
}

// Función para obtener usuarios
export const getAllCustomers = async (req, res) =>{
    try {
        const customers = await Customers.find();
        res.status(200).json({
            customers
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Funcion para mostrar a los clientes por id
export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customers.findById(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Cliente no existe',
      });
    }

    return res.status(200).json({
      success: true,
      data: customer,
    });

  } catch (error) {

    // Manejar error de ObjectId inválido
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Cliente no existe',
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Función para actualizar el cliente por id
export const updateCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCustomer = await Customers.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,        // devuelve el actualizado
        runValidators: true, // aplica validaciones del schema
      }
    );

    if (!updatedCustomer) {
      return res.status(404).json({
        success: false,
        message: "Cliente no existe",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedCustomer,
      message : 'Cliente actualizado correctamente'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCustomerById = async(req, res) =>{
  try {
    const {id} = req.params
    const deleteCustomer =  await Customers.findByIdAndDelete(id);

    if(!deleteCustomer){
      return res.status(400).json({
        success: false,
        message: 'Cliente no existe'
      });
    }

    // Si existe devolver clientes
    return res.status(200).json({
      success: true,
      data: deleteCustomer,
      message: `Cliente eliminado`,

    })

  } catch (error) {
     return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}