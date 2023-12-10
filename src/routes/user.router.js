import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import UserModel from "../models/userModel.js"; 

const controller = new UserController();
const router = Router();

router.post("/register", controller.register);

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Asignar el objeto de usuario a la sesión
        req.session.user = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.email === 'adminCoder@coder.com' && user.password === 'adminCod3r123' ? 'admin' : 'usuario'
        };

        // Redireccionar a la vista de productos después del login exitoso
        res.redirect('/products');
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy();  // Destruye la sesión
    res.redirect('/login');  // Redirige a la vista de login después del logout
});
export default router;
