import UserModel from '../models/userModel.js';


const registerUser = async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crear nuevo usuario
        const newUser = new UserModel({
            first_name,
            last_name,
            email,
            age,
            password,
            role: 'usuario' // Todos los usuarios que no son admin tienen el rol "usuario"
        });

        // Guardar en la base de datos
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
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
            role: user.role
        };

        // Redireccionar a la vista de productos después del login exitoso
        res.redirect('/products');
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export { registerUser, loginUser };








