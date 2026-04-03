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