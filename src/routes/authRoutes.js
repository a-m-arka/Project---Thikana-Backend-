import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

router.post('/register-user',register);
router.post('/login-user',login);

export default router;