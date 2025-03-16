import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

router.post('/register_user',register);
router.post('/login_user',login);

export default router;