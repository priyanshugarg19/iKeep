import Comment from "../models/commentModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createComment = async (req, res, next) => {
    const { userId, postId, content } = req.body;

    if (req.user.id !== userId) {
        return next(errorHandler(403, "Unauthorized to make a comment"));
    }

    try {
        const newComment = new Comment({
            content,
            userId,
            postId,
        });

        await newComment.save();
        res.status(200).json(newComment);
    } catch (error) {
        next(error);
    }
};

export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).sort({
            createdAt: -1,
        });
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};

export const likeComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentid);
        if (!comment) {
            next(errorHandler(404, "Comment not found"));
        }
        const userIndex = comment.likes.indexOf(req.user.id);
        if (userIndex === -1) {
            comment.numberOfLikes += 1;
            comment.likes.push(req.user.id);
        } else {
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex, 1);
        }
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
};

export const editComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentid);
        if (!comment) {
            next(errorHandler(404, "Comment not found"));
        }
        if (comment.userId !== req.user.id) {
            next(errorHandler(401, " Unauthorized to edit Commnet"));
        } else {
            const editedComment = await Comment.findByIdAndUpdate(
                req.params.commentid,
                {
                    content: req.body.content,
                },
                { new: true }
            );
            res.status(200).json(editedComment);
        }
    } catch (error) {
        next(error);
    }
};

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentid);

        if (!comment) {
            return next(errorHandler(404, "Comment not found"));
        }

        if (comment.userId !== req.user.id && !req.user.isAdmin) {
            return next(errorHandler(401, "Unauthorized to delete Comment"));
        }
        await Comment.findByIdAndDelete(req.params.commentid);
        res.status(200).json("Comment deleted successfully");
    } catch (error) {
        next(error);
    }
};
