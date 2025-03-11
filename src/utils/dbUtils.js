import { pool } from '../config/db.js';
import dbQueries from './dbQueries.js';

const createTable = async (tableName, query) => {
    try {
        await pool.query(query);
    } catch (error) {
        console.error(`Error creating ${tableName} table`, error);
        throw error;
    }
};

const createAllTables = async () => {
    try {
        await createTable('Users', dbQueries.createUsersTable);
        await createTable('Properties', dbQueries.createPropertiesTable);
        await createTable('Posts', dbQueries.createPostsTable);
        await createTable('Messages', dbQueries.createMessagesTable);
        await createTable('Property_Images', dbQueries.createPropertyImagesTable);
        console.log('All tables initialized successfully');
    } catch (error) {
        console.error('Error creating tables', error);
        throw error;
    }
};

export default createAllTables;