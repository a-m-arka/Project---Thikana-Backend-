import express from 'express';
import { checkConnection } from './src/config/db.js';
import createAllTables from './src/utils/dbUtils.js';

const app = express();
const port = 4000;

// app.get('/', (req, res) => {
//     res.send('Welcome to Thikana!');
// });

app.use(express.json());

app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    try{
        await checkConnection();
        await createAllTables();
    }catch(error){
        console.error('Failed to initialize database', error);
    }
});