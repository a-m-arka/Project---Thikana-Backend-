import * as postService from "../services/postService.js";

export const createPost = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    const propertyId = req.params.propertyId;
    if (!propertyId) {
        return res.status(400).json({ message: 'Property ID is required' });
    }
    const { postType } = req.body;
    if (!postType) {
        return res.status(400).json({ message: 'Post type is required' });
    }
    if (postType !== "sell" && postType !== "rent") {
        return res.status(400).json({ message: 'Invalid post type' });
    }
    try {
        const response = await postService.createPost(token, propertyId, postType);
        if (response.success) {
            return res.status(201).json({ message: response.message });
        }
        return res.status(400).json({ message: response.message });
    } catch (error) {
        console.error('Error creating new post:', error);
        return res.status(500).json({ message: 'Failed to create post. Internal Server Error' });
    }
};

export const deletePost = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    const postId = req.params.postId;
    if (!postId) {
        return res.status(400).json({ message: 'Post ID is required' });
    }
    try {
        const response = await postService.deletePost(token, postId);
        if (response.success) {
            return res.status(200).json({ message: response.message });
        }
        return res.status(400).json({ message: response.message });
    } catch (error) {
        console.error('Error deleting post:', error);
        return res.status(500).json({ message: 'Failed to delete post. Internal Server Error' });
    }
};
