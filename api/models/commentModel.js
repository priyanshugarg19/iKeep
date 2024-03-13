import mongoose from "mongoose";

const commentSchema= new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        required: true
    },
    numberOfLikes: {
        type : Number,
        required: true
    }

},{timestamps: true})

const Comment = mongoose.model('Comment',commentSchema);

export default Comment