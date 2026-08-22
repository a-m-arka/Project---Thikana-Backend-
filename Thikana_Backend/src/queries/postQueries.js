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
    `,

  getPublishedPosts: `
        SELECT
            post.post_id,
            post.post_type,
            post.created_at,
            property.property_id,
            property.user_id,
            owner.name AS owner_name,
            property.title,
            property.address,
            property.city,
            property.price,
            property.type,
            property.description,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'url', image.image_url,
                    'publicId', image.cloudinary_public_id
                )
            ) AS images
        FROM Posts post
        JOIN Properties property ON property.property_id = post.property_id
        JOIN Users owner ON owner.user_id = property.user_id
        LEFT JOIN Property_Images image ON image.property_id = property.property_id
        GROUP BY post.post_id
        ORDER BY post.created_at DESC, post.post_id DESC;
    `,
};

export default postQueries;
