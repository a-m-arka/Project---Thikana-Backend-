const createTableQueries = {
    createUsersTable: `
        CREATE TABLE IF NOT EXISTS Users (
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            phone_number VARCHAR(20),
            password VARCHAR(255) NOT NULL,
            address TEXT,
            profile_picture_url VARCHAR(512)
        );
    `,

    createPropertiesTable: `
        CREATE TABLE IF NOT EXISTS Properties (
            property_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            title VARCHAR(255) NOT NULL,
            address TEXT NOT NULL,
            city VARCHAR(100),
            price DECIMAL(15, 2),
            type ENUM('flat', 'house', 'commercial') NOT NULL,
            description TEXT,
            FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
        );
    `,

    createPostsTable: `
        CREATE TABLE IF NOT EXISTS Posts (
            post_id INT AUTO_INCREMENT PRIMARY KEY,
            property_id INT,
            user_id INT,
            status ENUM('active', 'inactive') DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (property_id) REFERENCES Properties(property_id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
        );
    `,

    createMessagesTable: `
        CREATE TABLE IF NOT EXISTS Messages (
            message_id INT AUTO_INCREMENT PRIMARY KEY,
            sender_id INT,
            receiver_id INT,
            post_id INT,
            message_text TEXT,
            sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            read_status ENUM('unread', 'read', 'delivered') DEFAULT 'unread',
            message_type ENUM('text', 'image', 'file') DEFAULT 'text',
            deleted_by_sender BOOLEAN DEFAULT FALSE,
            deleted_by_receiver BOOLEAN DEFAULT FALSE,
            is_edited BOOLEAN DEFAULT FALSE,
            FOREIGN KEY (sender_id) REFERENCES Users(user_id) ON DELETE CASCADE,
            FOREIGN KEY (receiver_id) REFERENCES Users(user_id) ON DELETE CASCADE,
            FOREIGN KEY (post_id) REFERENCES Posts(post_id) ON DELETE CASCADE
        );
    `,

    createPropertyImagesTable: `
        CREATE TABLE IF NOT EXISTS Property_Images (
            image_id INT AUTO_INCREMENT PRIMARY KEY,
            property_id INT,
            image_url VARCHAR(512),
            FOREIGN KEY (property_id) REFERENCES Properties(property_id) ON DELETE CASCADE
        );
    `
};

export default createTableQueries;
