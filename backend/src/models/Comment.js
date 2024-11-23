const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    body: { type: String, required: true },
    name: { type: mongoose.Schema.Types.ObjectId, ref: 'Name', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null }
}, {timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;