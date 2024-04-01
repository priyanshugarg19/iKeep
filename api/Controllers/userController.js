import { errorHandler } from "../utils/errorHandler.js";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import bcryptjs from 'bcryptjs';
import Comment from "../models/commentModel.js";


export default (req, res)=> {
    res.json({message: 'Api is Working!'})
}

export const updateUser=async (req, res, next) => {

    if(req.user.id !==req.params.userid){
        return next(errorHandler(403,"unauthorized"));
    }

    if(req.body.password){
        if (req.body.password < 7){
            return next(errorHandler(400, 'password should be greater than 7 characters'));
        }
        req.body.password= bcryptjs.hashSync(req.body.password, 10);
    }

    if(req.body.username){
        if(req.body.username.length > 20 || req.body.username.length < 5){
            return next(errorHandler(400, 'username should be between 5 and 20 character'));
        }
        if(req.body.username.includes(" ")){
            return next(errorHandler(400, 'username should not contain spaces'));
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandler(400, 'username should be in lower case'));
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400, 'username should not contain speacial characters'))
        }
    }
    try {

        const updatedUser =await User.findByIdAndUpdate(req.params.userid,{
            $set:{
                username: req.body.username,
                password: req.body.password,
                photoUrl: req.body.photoUrl,
                email: req.body.email
            }
        },{ new: true })

        const{password, ...rest} = updatedUser._doc;

        res.json(rest);


    } catch (error) {
        next()
    }
}

export const deleteUser = async (req,res,next)=>{
    if(req.user.id !== req.params.userid){
        next(errorHandler(401,"you are not authorized to delete user"))
    }
    try {
        await User.findByIdAndDelete(req.params.userid);
        await Comment.deleteMany({ userId: req.params.userid});
        res.status(200).json('User has been deleted');
    } catch (error) {
        next(error);
    }
}
export const signOut = async (req,res,next)=>{
    try {
        res.clearCookie('access_token').status(200).json("user has successfully signed out");
        
    } catch (error) {
        next(error);
    }
}

export const getUsers=async(req, res, next )=>{
    if(!req.user.isAdmin){
        next(errorHandler(401, 'not authorized'));
    }
    try {
        const startIndex = (req.query.startIndex) || 0
        const limit =parseInt(req.query.limit) || 9;
        const sortDirection = (req.query.sortDirection== 'asc' ? 1 : -1);
        const users= await User.find({}).sort({createdAt: sortDirection}).skip(startIndex).limit(limit);

        const usersWithoutPass= users.map((user)=>{
            const{password, ...rest}= user._doc;
            return rest;
        })
        const now = new Date();

        const oneMonthAgo= new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        )

        const lastMonthUser= await User.countDocuments({
            createdAt:{ $gte : oneMonthAgo}
        });
        const totalUser= await User.countDocuments();
        res.status(200).json({usersWithoutPass, totalUser, lastMonthUser});
    } catch (error) {
        next(error);
    }
}

export const adminDel= async(req,res,next)=>{
    if(req.user.id !== req.params.userid){
        next(errorHandler(401,"you are not authorized to delete user"))
    }
    try {
        await User.findByIdAndDelete(req.params.usertodel);
        await Post.deleteMany({ userId: req.params.usertodel});
        await Comment.deleteMany({ userId: req.params.usertodel});
        res.status(200).json('User has been deleted');

    } catch (error) {
        next(error);
    }
}

export const validUser = async(req, res, next)=>{
    try {
        const user =await User.findById( req.user.id);
        
        if(req.user.id !== user._id.toString()){
            console.log(req.user.id, user._id.toString());
            res.clearCookie('access_token').status(200).json("User has been signed Out");
        }else {
            const validUser = true;
            res.status(200).json(validUser);
            
        }
    } catch (error) {
        next(error);
    }
}

export const getUser =async (req,res,next)=>{
try {
    const user =await User.findById(req.params.userId);
    if(!user){
        next(errorHandler(400, "User not found"))
    };
    const {password, ...rest} = user._doc;
    res.status(200).json(rest);
} catch (error) {
    next(error);
}
}