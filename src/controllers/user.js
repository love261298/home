import Player from "../models/Player.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const update = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_CODE);
        const point = await Player.findByIdAndUpdate(decoded._id, req.body, {new: true});
        point.password = undefined;
        return res.status(200).send({
            message: 'Cap nhat diem thanh cong',
            data: point
        })
    } catch (error) {
        return res.send({
            name: error.name,
            message: error.message
        })
    }
};