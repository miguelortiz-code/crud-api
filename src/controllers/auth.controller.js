import {Users} from '../models/index.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login =  async (req, res, next) => {

}

export const register = async (req, res, next) => {
    // Leer los datos del usuario
    const user =  new Users(req.body);
    user.password = await bcrypt.hash(req.body.password, 12);
    try {
        await user.save();
        res.json({
            success: true,
            status: 201,
            message: 'Usuario creado correctamente'
        })
    } catch (error) {
        res.json({
            status: 500,
            message: `Hubo un error al registrar el usuario: ${error}`,
        });
    }
}