import Joi from "joi";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import config from 'config';

// We define an interface so TypeScript knows the shape of our User document.
// Without it, TypeScript may not know that the Mongoose document has our
// custom generateAuthToken() method.
interface IUser {
    name: string;
    email: string;
    password: string;
    generateAuthToken(): string;
}

export const userSchema = new mongoose.Schema<IUser>({
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
});

// why token generation here?
// Information Expert Principle
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey'));
    return token;
}

export const User = mongoose.model('User', userSchema);

export default function validateUser(user: {name: string, email: string, password: string}) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    });
    
    return schema.validate(user); // new Joi syntax
}

export function validateLogin(user: {
    email: string;
    password: string;
}) {
    const schema = Joi.object({
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),

        password: Joi.string()
            .min(5)
            .max(1024)
            .required()
    });

    return schema.validate(user);
}