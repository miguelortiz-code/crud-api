import {Users} from '../models/index.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login =  async (req, res, next) => {
    // Buscar usuario
    const {email, password} = req.body;
    const user =  await Users.findOne({email});

    if(!user){
        // Si no existe el usuario
        await res.status(401).json({ message: 'El usuario no se ha registrado'});
        next();
    }else{
        // El usuario existe, verificar el password
        if(!bcrypt.compareSync(password, user.password)){
            // Si el password es incorrecto
            await res.status(401). json({message:  'La contraseña ingresada no es correcta'});
            next();
        }else{
            // password Correcto, firmar token
            const token =  jwt.sign(
            {
                email: user.email,
                name: user.name,
                id: user._id
            }, 
            'LLAVESECRETA',
            {
                expiresIn: '1h'
            });

            // Retornar el TOKEN
            res.json({token}); 
        }
    }
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