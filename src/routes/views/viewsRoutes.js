import express from 'express';
const router = express.Router();
import * as viewsController from '../../controllers/viewsController.js';
import { requireLogin } from '../../middlewares/authMiddleware.js';

router.get('/', viewsController.showLogin);
router.get('/register', viewsController.showRegister);
router.get('/profile', requireLogin, viewsController.showProfile);
router.get('/products', requireLogin, viewsController.showProducts);

export default router;



