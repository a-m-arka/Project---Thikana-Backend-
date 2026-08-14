import express from 'express';
import upload from '../config/multer.js';
import * as propertyController from '../controllers/propertyController.js';

const router = express.Router();

router.post('/register-property', upload.array('files', 10), propertyController.registerProperty);
router.delete('/delete-property/:propertyId', propertyController.deleteProperty);
router.put('/update-property/:propertyId', propertyController.updatePropertyDetails);
router.post('/add-new-images/:propertyId', upload.array('files', 10), propertyController.addNewPropertyImages);
router.delete('/delete-images/:propertyId', propertyController.deletePropertyImages);
router.get('/user-properties', propertyController.getUserProperties);

export default router;