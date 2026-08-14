const postQueries = {
    createPost: `
        INSERT INTO Posts (property_id, user_id, post_type)
        VALUES (?, ?, ?);
    `,

    deletePost: `
        DELETE FROM Posts
        WHERE post_id = ?;
    `,

    checkPropertyPosted: `
        SELECT 1
        FROM Posts p
        WHERE p.property_id = ?;
    `,

    checkPostExists: `
        SELECT 1
        FROM Posts p
        WHERE p.post_id = ?;
    `,

    getPostUser: `
        SELECT 
            p.user_id
        FROM Posts p
        WHERE p.post_id = ?;
    `
};

export default postQueries;
