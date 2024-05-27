import { Blog } from "../models/blog.model.js"
import { Comment } from "../models/comment.model.js"

const handleAddBlog = (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    })
}

const handleAddNewBlog = async (req, res) => {
    const { title, body } = req.body
    const createdBlog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`
    })

    return res.redirect(`/blog/${createdBlog._id}`)
}

const handleGetSingleBlog = async (req, res) => {
    const blogId = req.params.id
    const blogData = await Blog.findOne({ _id: blogId }).populate("createdBy")
    const comments = await Comment.find({ blogId: blogId }).populate("createdBy")
    res.render("blog", {
        user: req.user,
        blog: blogData,
        comments
    })
}

const handleUserComment = async (req, res) => {
    const blogId = req.params.id
    await Comment.create({
        content: req.body.content,
        blogId: blogId,
        createdBy: req.user._id
    })
    return res.redirect(`/blog/${blogId}`)
}

export {
    handleAddBlog,
    handleAddNewBlog,
    handleGetSingleBlog,
    handleUserComment
}