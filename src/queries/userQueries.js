const userQueries = {
    createUser: `INSERT INTO users (name, email, phone_number, password) VALUES (?, ?, ?, ?);`,
    findUserByEmail: `SELECT * FROM users WHERE email = ?;`,
    getUserData: `SELECT user_id, name, email, phone_number, address, profile_picture_url FROM users WHERE user_id = ?;`,
};

export default userQueries;