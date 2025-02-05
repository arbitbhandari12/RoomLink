const comment = require('../models/comment-model');

const Comment = async (req, res) => {
  const room = req.params.id;
  const name = req.user.username;
  try {
    await comment.create({
      name,
      comment: req.body.comment,
      room
    });
    res.status(201).json({ message: 'Comment created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const getComment = async (req, res) => {
  const room = req.params.id;
  try {
    const comments = await comment.find({room});
    console.log(comments);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

module.exports ={Comment, getComment};
