
const express = require('express');
const jwt = require('jsonwebtoken');
const Comment = require('../model/commentModel');

const router = express.Router();

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401)
            .send({ message: 'Unauthorized' });
    }
    try {
        const decodedToken = jwt.verify(token, 'your-secret-key');
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        console.error('Error in authenticateUser:', error);
        res.status(401)
            .send({ message: 'Unauthorized' });
    }
};

// Create a comment
router.post('/comments', authenticateUser, async (req, res) => {
    try {
        const { text, parentCommentId } = req.body;
        const author = req.userId;
        const newComment = new Comment({ text, author });
        if (parentCommentId) {
            newComment.parentComment = parentCommentId;
        }
        await newComment.save();
        res.status(201)
            .send({ message: 'Comment created successfully' });
    } catch (error) {
        console.error('Error in creating comment:', error);
        res.status(500)
            .send({ message: 'Something went wrong' });
    }
});

// Get comments with pagination
router.get('/comments', async (req, res) => {
    try {
        const page = parseInt(req.query.page || 1);
        const commentsPerPage = 10;
        const skip = (page - 1) * commentsPerPage;
        const comments = await Comment.find().sort({ _id: -1 }).skip(skip).limit(commentsPerPage).exec();
        res.status(200)
            .send(comments);
    } catch (error) {
        console.error('Error in fetching comments:', error);
        res.status(500)
            .send({ message: 'Something went wrong' });
    }
});

// Like a comment
router.post('/comments/:id/like', authenticateUser, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404)
                .send({ message: 'Comment not found' });
        }
        if (comment.author.toString() === req.userId) {
            return res.status(403)
                .send({ message: 'You cannot like your own comment' });
        }
        if (comment.likes.includes(req.userId)) {
            return res.status(400)
                .send({ message: 'You already liked this comment' });
        }
        comment.likes.push(req.userId);
        await comment.save();
        res.status(200)
            .send({ message: 'Comment liked successfully' });
    } catch (error) {
        console.error('Error in liking comment:', error);
        res.status(500)
            .send({ message: 'Something went wrong' });
    }
});

// Dislike a comment
router.post('/comments/:id/dislike', authenticateUser, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404)
                .send({ message: 'Comment not found' });
        }
        if (comment.author.toString() === req.userId) {
            return res.status(403)
                .send({ message: 'You cannot dislike your own comment' });
        }
        if (comment.dislikes.includes(req.userId)) {
            return res.status(400)
                .send({ message: 'You already disliked this comment' });
        }
        comment.dislikes.push(req.userId);
        await comment.save();
        res.status(200)
            .send({ message: 'Comment disliked successfully' });
    } catch (error) {
        console.error('Error in disliking comment:', error);
        res.status(500)
            .send({ message: 'Something went wrong' });
    }
});

module.exports = router;
