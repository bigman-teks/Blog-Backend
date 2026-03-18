const Comment = require("../schema/commentSchema")


// Add Commentm or Reply
const addComment = async (req, res) => {
    try {
    const { text, parentComment } = req.body;

    const comment = await Comment.create({
      text,
      post: req.params.postId,
      user: req.user.id,
      parentComment: parentComment || null
    });

    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get Comments for a Post
const getComments = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("user", "name");

  res.json(comments);
}

const getCommentsThread = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("user", "name");

    // Separate main comments and replies
    const mainComments = comments.filter(c => !c.parentComment);
    const replies = comments.filter(c => c.parentComment);

    // Attach replies to parent
    const structured = mainComments.map(comment => {
      return {
        ...comment._doc,
        replies: replies.filter(
          r => r.parentComment?.toString() === comment._id.toString()
        )
      };
    });

    res.json(structured);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    addComment,
    getComments,
    getCommentsThread
}