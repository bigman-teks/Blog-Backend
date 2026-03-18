const {Router} = require("express")
const { getComments,addComment, getCommentsThread } = require("../Controllers/commentController")
const auth = require("../middleware/authMiddleware")


const CommentRouter = Router()

CommentRouter.post("/comment/:postId", auth, addComment)
CommentRouter.get("/comments/:postId", auth,getComments)
CommentRouter.get("/comment/:postId",getCommentsThread)
// CommentRouter.delete("/comment/:id", deleteComment)

module.exports = CommentRouter
