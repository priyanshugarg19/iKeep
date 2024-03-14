import Comment from '../models/commentModel.js';
import { errorHandler } from '../utils/errorHandler.js';



export const createComment =async (req, res, next)=>{

    const { userId, postId, content}= req.body;

    if(req.user.id !== userId){
        return next(errorHandler(403,"Unauthorized to make a comment"));
    }

    try {
        
        const newComment = new Comment({
            content,
            userId,
            postId,
        })

        await newComment.save();
        res.status(200).json(newComment);
    } catch (error) {
        next(error);
    }

}

export const getComments =async (req, res, next)=>{
    try {
        const comments=await Comment.find({postId: req.params.postId}).sort({
            createdAt: -1
        });
        res.status(200).json(comments);
    } catch (error) {
        next(error)
    }
}