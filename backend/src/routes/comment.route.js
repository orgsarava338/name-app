const express = require('express');
const { getAllCommentsByNameId, addComment, replyComment, updateComment, deleteComment } = require('../controllers/comment.controller');
const { authorizeRoles } = require('../middlewares/auth.middleware');

const commentRouter = express.Router();

/** PUBLIC */
commentRouter.get('/:nameId', getAllCommentsByNameId);

/** USER */
commentRouter.post('/:nameId', addComment);
commentRouter.post('/reply/:commentId', replyComment);
commentRouter.put('/:commentId', updateComment);
commentRouter.delete('/:nameId/:commentId', deleteComment);

module.exports = commentRouter;