import { Router } from "express"
import {handleAddBlog, handleAddNewBlog, handleGetSingleBlog, handleUserComment} from "../controllers/blog.controller.js"
import { upload } from "../utils/uploadImage.js"


const router = Router()

router.route("/add-Blog").get(handleAddBlog).post(upload.single("coverImage"),handleAddNewBlog)
router.route("/:id").get(handleGetSingleBlog)
router.route("/comment/:id").post(handleUserComment)

export default router