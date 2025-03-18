import { getUserService, updateProfilePictureService, editProfileService } from "../services/userService.js";

export const getUserController = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    try{
        const response = await getUserService(token);
        
        if(response.success){
            return res.status(200).json({ data: response.data });
        }
        return res.status(400).json({ message: response.message });
    }catch(error){
        console.error('Error during getting user data:', error);
        return res.status(500).json({ message: 'Failed to get data. Internal Server Error' });
    }
};

export const updateProfilePictureController = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    try{
        const fileBuffer = req.file.buffer;
        const fileName = `uploads/${Date.now()}-${req.file.originalname}`;
        const response = await updateProfilePictureService(token, fileBuffer, fileName);
        
        if(response.success){
            return res.status(200).json({ message: response.message });
        }
        return res.status(400).json({ message: response.message });
    }catch(error){
        console.error('Error during updating profile picture:', error);
        return res.status(500).json({ message: 'Failed to update profile picture. Internal Server Error' });
    }
};

export const editProfileController = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    const { name, email, phone, address } = req.body;
    if(email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))){
        return res.status(400).json({ message: 'Invalid email format' });
    }
    if(phone && (!/^01[3-9]\d{8}$/.test(phone))){
        return res.status(400).json({ message: 'Invalid Bangladeshi phone number' });
    }
    try{
        const newData = { name, email, phone, address };
        const response = await editProfileService(token, newData);
        
        if(response.success){
            return res.status(200).json({ message: response.message });
        }
        return res.status(400).json({ message: response.message });
    }catch(error){
        console.error('Error during updating profile:', error);
        return res.status(500).json({ message: 'Failed to update profile. Internal Server Error' });
    }
};
