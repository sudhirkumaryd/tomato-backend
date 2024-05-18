

import bcrypt from 'bcrypt'

import validator from 'validator'
import jwt from "jsonwebtoken"

import userModel from "../models/userModel.js";

const loginUser = async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user= await userModel.findOne({email})
        if(!user)
          {  return res.json({success:false,message:"user doesn`t exists"})}

            
            if(password!=user.password)
               { return res.json({success:false,message:"Invalid credentials"})}

            const   token=createToken(user._id);
             res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"ERROR"})
    }

}
const createToken= (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

const registerUser = async (req,res)=>{

    const {name,password,email}=req.body;
    try {
        const exists= await userModel.findOne({email})
        if(exists)
            return res.json({success:false,message:"user alresdy exists"})
        if(!validator.isEmail(email))
            {
                return res.json({success:false,message:"please enter valid email"})
            }
            if(password.length<8)
                {
                    return res.json({success:false,message:"please enter strong password"})
                }

                const salt= await bcrypt.genSalt(10);
                const hashedPassword= await bcrypt.hash(password,salt)

                const newUser= new userModel({
                    name:name,
                    email:email,
                    password:password,
                })
                const user= await newUser.save();
                const token=createToken(user._id)
                res.json({success:true,token})




    } catch (error) {
        console.log(error);
        res.json({success:false,message:"ERROR"})
    }
}
export {loginUser,registerUser}