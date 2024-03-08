import Post from "../models/postModel.js";
import { errorHandler } from "../utils/errorHandler.js"


export const create = async(req, res, next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(400,"You are not authorized to create post"));
    }
    if (!req.body.title || !req.body.content) {
        return(errorHandler(400, "All fields are required"));
    }
    const slug = req.body.title.split().join("-").toLowerCase().replace(/[^a-zA-Z0-9-]/g,"");
    const newPost= new Post({
        ...req.body, slug, userId: req.user.id
    });
    try {
        const savedPost= await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        next(error)
    }
}


export const getPosts= async(req,res,next)=>{
    try {
        const startIndex= parseInt(req.query.startIndex) || 0; 
        const limit=parseInt(req.query.limit) || 9;
        const sortDirection= (req.query.sortDirection== 'asc' ? 1 : -1);
        const posts=await Post.find({
            ...(req.query.userId && {userId : req.query.userId}),
            ...(req.query.category && {category : req.query.category}),
            ...(req.query.slug && {category : req.query.slug}),
            ...(req.query.postId && {_Id : req.query.postId}),
            ...(req.query.searchParams && {
                $or:[{
                    title: {$regex: req.query.searchParams, $option: 'i'}},
                    {
                    content:{$regex: req.query.searchParams, $option: 'i'}
                }
                ]
                
            } )}
        ).sort({updatedAt: sortDirection}).skip(startIndex).limit(limit);

        const totalposts= await Post.countDocuments();

        const now = new Date();

        const oneMonthAgo= new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        )

        const lastMonthPosts= await Post.countDocuments({
            createdAt:{ $gte : oneMonthAgo}
        });

        res.status(200).json({
            posts, totalposts, lastMonthPosts
        })
    } catch (error) {
        next(error)
    }
}

export const deletepost = async(req,res,next)=> {
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandler(403, "User is not authorized to perform this action"));
    }
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json("Post Successfully Deleted...");
    } catch (error) {
        next(error);
    }
}

