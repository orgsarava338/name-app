const mongoose = require('mongoose');

const Comment = require('../models/Comment');
const Name = require('../models/Name');

exports.getAllCommentsByNameId = async (req, res) => {
    try {
        const { nameId } = req.params;
        const name = new mongoose.Types.ObjectId(nameId)

        const comments = await Comment
            .find({ name, parent: null })
            .populate({ path: 'user', select: 'username email' })
            .lean();

        const populateReplies = async (comment) => {
            const commentId = new mongoose.Types.ObjectId(comment._id);
            const replies = await Comment
                .find({ name, parent: commentId })
                .populate({ path: 'user', select: 'username email' })
                .lean();

            for (let reply of replies) {
                reply.replies = await populateReplies(reply);
            }

            return replies;
        };

        for (let comment of comments) {
            comment.replies = await populateReplies(comment);
        }        
        
        res.json({ data: comments });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Comments not loaded', error: error.message });
    }
};

exports.addComment = async (req, res) => {
    try {
        const { nameId } = req.params
        const { body } = req.body;
        const user = req.user?.id || '6738ead35e01e509b6f9a5ca'

        const comment = new Comment({name: nameId, body: body, user});
        await comment.save()
        await Name.findByIdAndUpdate(nameId, { $push: {comments: comment._id} });

        res.status(201).json({data: comment})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'comment not added', error: error.message})
    }
}

exports.replyComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { nameId, body } = req.body;
        const user = req.user?.id || '6738ead35e01e509b6f9a5ca'

        const reply = new Comment({ name: nameId, body, user, parent: commentId });
        await reply.save();

        res.status(201).json({data: reply})
    } catch (error) {
        res.status(500).json({message: 'reply comment not added', error: error.message})
    }
}

exports.updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { body } = req.body;

        const comment = await Comment.findByIdAndUpdate(commentId, { body }, { new: true })
        if(!comment) res.status(404).json({message: 'comment not found to update'})

        res.json({data: comment})
    } catch (error) {
        res.status(500).json({message: 'comment not updated', error: error.message})
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const deleteCommentWithReplies = async (id) => {
            await Comment.deleteMany({parent: id})
            await Comment.findByIdAndDelete(id);
        };

        await deleteCommentWithReplies(commentId);

        res.json({ message: "Comment and its replies deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Comment not deleted", error: error.message });
    }
};
