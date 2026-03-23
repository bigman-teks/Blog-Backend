const { default: slugify } = require("slugify")
const Post = require("../schema/postSchema")
const { post } = require("../Router/postRouter")


//getPost

const getPosts = async(req, res) =>{
    try {
        const post = await Post.find().populate("author", "name")
        res.status(200).json(post)

    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}


//getsinglePost

const getSinglePost = async(req, res) =>{
    try {
        const {id} = req.params
        const post = await Post.findById(id);
        if(!post)
            return res.status(400).json({message: "Post with this ID not find"})
        res.status(200).json(post)

       } catch (error) {
        res.status(500).json(({
            message: error.message
        }))
        
    }

}


//deletePost

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Allow if owner OR admin
    if (
      post.author.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// updatePost

const updatePost = async (req, res) => {
    try {
        const { id } = req.params

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,          // return updated document
                runValidators: true // run schema validation
            }
        )

        if (!updatedPost) {
            return res.status(404).json({
                message: "Post not found"
            })
        }

        res.status(200).json({
            message: "Post updated successfully",
            post: updatedPost
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//create a Post

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "All fields required" });
    }

    const post = await Post.create({
      title,
      content,
      author: req.user.id, // from auth middleware
      slug: slugify(title, { lower: true })
    });

    res.status(201).json({
      message: "Post created successfully",
      post
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate("author", "name");

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// Search Posts
const searchPosts = async (req, res) => {
  try {
    const keyword = req.query.q;

    const posts = await Post.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { content: { $regex: keyword, $options: "i" } }
      ]
    }).populate("author", "name");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const userId = req.user.id;

    if (post.likes.includes(userId)) {
      // Unlike
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      // Like
      post.likes.push(userId);
    }

    await post.save();

    res.json({ likes: post.likes.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    createPost,
    getPosts,
    getSinglePost,
    updatePost,
    deletePost,
    searchPosts,
    likePost,
    getPostBySlug
}