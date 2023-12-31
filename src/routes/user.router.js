import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import passport from 'passport';

const controller = new UserController();
const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get('/', controller.getUsers);
router.get('/register-github', passport.authenticate('github',{ scope: ["user:email"] }));
router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] }),
    githubResponse
);

export default router;
