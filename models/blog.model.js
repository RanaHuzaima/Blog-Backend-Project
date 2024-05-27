import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    title:{
        type: String,
        required: [true, "Title is required"]
    },
    body:{
        type: String,
        required: [true, "Body is required"]
    },
    coverImageURL:{
        type: String,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export const Blog = model("Blog", blogSchema)