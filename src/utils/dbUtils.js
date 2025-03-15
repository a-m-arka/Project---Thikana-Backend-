import { pool } from '../config/db.js';
import createTableQueries from '../queries/createTableQueries.js';

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
        await createTable('Users', createTableQueries.createUsersTable);
        await createTable('Properties', createTableQueries.createPropertiesTable);
        await createTable('Posts', createTableQueries.createPostsTable);
        await createTable('Messages', createTableQueries.createMessagesTable);
        await createTable('Property_Images', createTableQueries.createPropertyImagesTable);
        console.log('All tables initialized successfully');
    } catch (error) {
        console.error('Error creating tables', error);
        throw error;
    }
};

export default createAllTables;