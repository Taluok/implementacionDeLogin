import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import UserController from "../controllers/user.controller.js";

const userController = new UserController();

// Configuración de Passport para la estrategia de GitHub
const strategyOptions = {
    clientID: "Iv1.c88c5eab255e1fc6",
    clientSecret: "b67262857bd387f748a5c0ae3f9d84a6f1885351", 
    callbackURL: "http://localhost:8080/users/github"
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile._json.email;
        const user = await userService.getByEmail(email);

        if (user) {
            return done(null, user);
        }

        const newUser = await userService.register({
            first_name: profile._json.name,
            email,
            isGithub: true,
        });

        return done(null, newUser);
    } catch (error) {
        return done(error);
    }
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));

