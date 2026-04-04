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