const userQueries = {
    createUser: `
        INSERT INTO users (name, email, phone_number, password) 
        VALUES (?, ?, ?, ?);
    `,
    getUserData: `
        SELECT user_id, name, email, phone_number, address, 
               profile_picture_url, profile_picture_cloudinary_id 
        FROM users 
        WHERE user_id = ?;
    `,
    findUserByEmail: `
        SELECT * FROM users 
        WHERE email = ?;
    `,
    updateProfilePicture: `
        UPDATE users 
        SET profile_picture_url = ?, profile_picture_cloudinary_id = ? 
        WHERE user_id = ?;
    `,
    updateUserDetails: `
        UPDATE users 
        SET 
            name = COALESCE(?, name), 
            email = COALESCE(?, email),
            phone_number = COALESCE(?, phone_number),
            address = COALESCE(?, address)
        WHERE user_id = ?;
    `,
};

export default userQueries;
