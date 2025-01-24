
import  jwt  from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import {  signInValidator, signUpValidator } from "../validation/user.js";
import dotenv  from "dotenv";
import Player from "../models/Player.js";
dotenv.config() 

export const signUp = async (req, res) => {
    try {
        const {error} = signUpValidator.validate(req.body, {abortEarly: false});
        if(error) {
            const errors = error.details.map(err => err.message);
            return res.send({
                message: errors,
            })
        }
        const userExists = await Player.findOne({phone: req.body.phone})
        if(userExists) {
            return res.status(400).send({
                message: "Tai khoan da ton tai!"
            }) 
        }
        const hashedPassword = await bcryptjs.hash(req.body.password, 10)
        const user = await Player.create({
            ...req.body,
            password: hashedPassword
        })
        user.password = undefined;
        return res.status(200).send({
            message: 'Dang ky account thanh cong!',
            user
        })
    } catch (error) {
        return res.send({
            name: error.name,
            message: error.message
        })
    }
}

export const signIn = async (req, res) => {
    try {
        const {error} = signInValidator.validate(req.body, {abortEarly: false});
        if(error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).send({
                message: errors,
            })
        }
        const user = await Player.findOne({phone: req.body.phone})
        if(!user) {
            return res.status(400).send({
                message: "email nay chưa được đăng ký",
            }) 
        }
        const isMatch = bcryptjs.compare(req.body.password, user.password)
        if(!isMatch) {
            return res.status(400).send({
                message: "mat khau khong dung"
            })
        }
        const accessToken = jwt.sign({_id:user._id }, process.env.SECRET_CODE, {expiresIn: "1h"})
        user.password = undefined;
        return res.status(200).send({
            message: "Dang nhap thanh cong",
            user,
            accessToken
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        })
    }
}