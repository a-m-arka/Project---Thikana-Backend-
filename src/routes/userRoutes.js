import express from 'express';
import upload from '../config/multer.js';
import { getUserController, updateProfilePictureController } from '../controllers/userController.js';

const router = express.Router();

router.get('/get_user_data',getUserController);
router.put('/update_profile_picture', upload.single('file'), updateProfilePictureController);


export default router;