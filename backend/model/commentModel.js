

const createConnection = require("./config");

const mongoose = require("mongoose");

createConnection();

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    likes:
    {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,

        default: 0
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    nestedComments:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
});

module.exports = mongoose.model('Comment', commentSchema);
