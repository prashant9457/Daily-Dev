import Joi from "joi";
import mongoose from "mongoose";

export const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 1024,
    }
}));

export default function validateUser(user: {name: string, email: string, password: string}) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    });
    
    return schema.validate(user); // new Joi syntax
}
