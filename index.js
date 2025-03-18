import express from 'express';
import { checkConnection } from './src/config/db.js';
import createAllTables from './src/utils/dbUtils.js';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import imageRoutes from './src/routes/imageRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/image',imageRoutes);

app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    try{
        await checkConnection();
        await createAllTables();
    }catch(error){
        console.error('Failed to initialize database', error);
    }
});