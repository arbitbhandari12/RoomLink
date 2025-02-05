const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'ApproveList' }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
