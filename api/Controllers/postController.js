import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js"


export const create = async(req, res, next)=>{
    const valid =await User.findOne({_id: req.user.id});
    if(!req.user.isAdmin || valid==null){
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
        console.log(valid);
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
            ...(req.query.slug && {slug : req.query.slug}),
            ...(req.query.postId && {_id : req.query.postId}),
            ...(req.query.searchParams && {
                $or:[{
                    title: new RegExp( req.query.searchParams, 'i')},
                    {
                    content: new RegExp( req.query.searchParams, 'i')}
                
                ]
                
            } )}
        ).sort({updatedAt: sortDirection}).skip(startIndex).limit(limit);

        const totalposts= await Post.countDocuments();
        const userTotalPost = await Post.find({userId: req.params.userId})
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
            posts, totalposts, lastMonthPosts, userTotalPost
        })
    } catch (error) {
        next(error)
    }
}

export const deletepost = async(req,res,next)=> {
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandler(401, "User is not authorized to perform this action"));
    }
    try {
        await Comment.deleteMany({postId : req.params.postId})
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json("Post Successfully Deleted...");
    } catch (error) {
        next(error);
    }
}

export const updatePost = async (req, res, next)=> {
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandler(401, "User is not authorized to perform this action"));
    }
    const slug = req.body.title.split().join("-").toLowerCase().replace(/[^a-zA-Z0-9-]/g,"");
    try {
        const updatedPost =await Post.findByIdAndUpdate(req.params.postId,{
            $set:{
                title: req.body.title,
                content: req.body.content,
                image: req.body.image,
                slug,
                category: req.body.category
            }
        },{ new: true })

        res.status(200).json(updatedPost);
    } catch (error) {
        next(error)
    }
}

