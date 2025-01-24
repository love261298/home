import mongoose from "mongoose";
const playerSchema = new mongoose.Schema({
    phone: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    point: {
        type: Number,
        default: 0,
    }
}, {versionKey: false, timestamps: true});

export default mongoose.model('Player',playerSchema);