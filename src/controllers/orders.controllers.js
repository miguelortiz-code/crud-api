import {Orders} from '../models/index.model.js';

// Función para crear pedidos
export const newOrder = async (req, res) =>{
    const order = new Orders(req.body);
    try {
        await order.save();
        res.json({
            success: true,
            message: 'Se agrego un nuevo pedido'
        })
    } catch (error) {
        return res.status(500).json({
        success: false,
        message: error.message,
    });
    }
};

// Función para obtener todos los 

export const getAllOrders = async (req, res) =>{
    try {
        const orders = await Orders.find().populate('customer').populate({
            path: 'order.product',
            model: 'Products'
        });
        return res.status(200).json({
            orders
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}