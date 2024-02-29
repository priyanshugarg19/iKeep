import { errorHandler } from "../utils/errorHandler.js";
import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';


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