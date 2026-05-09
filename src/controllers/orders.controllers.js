import {Orders} from '../models/index.model.js';

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