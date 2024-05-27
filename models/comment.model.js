import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    content:{
        type: String,
        required: [true, "Content is required"]
    },
    blogId:{
        type: Schema.Types.ObjectId,
        ref: "Blog"
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export const Comment = model("Comment", commentSchema)