import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import bcrypt from 'bcrypt';

export async function register(req,res) {
    const {username,email,password} =req.body;

    const isAlreadyRegistered = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })         
    if(isAlreadyRegistered){
       return res.status(409).json({
        message:"username or email  already exists"
       })
    }   

const hashedPassword = await bcrypt.hash(password,10)
const user = await userModel.create({
    username,
    email,
    password:hashedPassword
})

const token = jwt.sign({
    id:user._id
},config.JWT_SECRET,{
    expiresIn:"1d"
})
res.status(201).json({
    message:"User Registered successfully",
    user:{
        username:user.username,
        email:user.email
    },
    token
})

}   

export async function getMe(req,res){
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({
            message:"Token not found"
        })
    }
    const decoded = jwt.verify(token, config.JWT_SECRET)
    const user = await userModel.findById(decoded.id)

    res.status(200).json({
        message:"User fetched successfullly",
        user:{
            username:user.username,
            email:user.email,
            password:user.password
        }
    })
}

 