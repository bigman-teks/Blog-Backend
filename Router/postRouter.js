const {Router} = require("express")
const { createPost, getPosts, getSinglePost, updatePost, deletePost, searchPosts, getPostBySlug } = require("../Controllers/postController")
const auth = require("../middleware/authMiddleware")


const postRouter = Router()


postRouter.post("/post", auth,createPost)
postRouter.get("/posts", getPosts)
postRouter.get("/posts/:id", getSinglePost)
postRouter.put("/posts/:id", auth,updatePost)
postRouter.delete("/posts/:id",auth, deletePost)
postRouter.get("/posts/search", searchPosts)
postRouter.get("/posts/slug/:slug", getPostBySlug);

module.exports = postRouter
