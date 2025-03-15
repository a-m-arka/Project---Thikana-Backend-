import express from 'express';
import { login, register, getUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register_user',register);
router.post('/login_user',login);
router.get('/get_user_data',getUser);

export default router;