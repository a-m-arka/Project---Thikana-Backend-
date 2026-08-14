import express from 'express';
import upload from '../config/multer.js';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/get-user-data',userController.getUser);
router.put('/update-profile-picture', upload.single('file'), userController.updateProfilePicture);
router.put('/edit-profile', userController.editProfile);
router.put('/change-password', userController.changePassword);


export default router;