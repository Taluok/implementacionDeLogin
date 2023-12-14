import UserServices from '../services/user.services.js';
import bcrypt from 'bcrypt';
import UserModel from '../models/userModel.js';

const userService = new UserServices();

export default class UserController {
    async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers();
            const usersPlain = users.map(user => user.toObject());
            return res.render('users', { users: usersPlain });
        } catch (error) {
            next(error);
        }
    }

    async register(req, res, next) {
        try {
            const { first_name, last_name, email, age, password } = req.body;

            // Delegar la lógica de registro al servicio
            const newUser = await userService.registerUser({
                first_name,
                last_name,
                email,
                age,
                password,
            });

            if (newUser) {
                res.redirect('/views/register');
            } else {
                res.redirect('/views/errorRegister');
            }
        } catch (error) {
            next(error);
        }
    }

    async githubResponse(req, res, next) {
        try {
            console.log(req.user);
            const { first_name, email, isGithub } = req.user;
            res.json({
                msg: "Register/login Github ok",
                session: req.session,
                user: {
                    first_name,
                    email,
                    isGithub
                }
            });
        } catch (error) {
            next(error.message);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await userService.login(email, password);
            if (user) {
                req.session.email = email;
                req.session.password = password;
                req.session.user = user;
                res.redirect('/views/profile');
            } else {
                res.redirect('/views/errorRegister');
            }
        } catch (error) {
            next(error);
        }
    }
}
