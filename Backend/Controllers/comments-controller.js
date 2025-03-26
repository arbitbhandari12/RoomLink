const comment = require('../models/comment-model');

const Comment = async (req, res) => {
  const room = req.params.id;
  const user = req.user;
  const name = user.username;

  if (!user) {
    return res.status(401).json({ error: 'Please login first' });
  }

  try {
    await comment.create({
      name,
      comment: req.body.comment,
      room,
      userId: user._id
    });
    res.status(201).json({ message: 'Comment created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const getComment = async (req, res) => {
  const room = req.params.id;
  try {
    const comments = await comment.find({ room });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const user = req.user;
    const commentToDelete = await comment.findById(commentId);
    if (!commentToDelete) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    if (commentToDelete.userId.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ error: 'You can only delete your own comments' });
    }
    await comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

module.exports = { Comment, getComment, deleteComment };
