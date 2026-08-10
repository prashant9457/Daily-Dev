import type { Request, Response } from "express";
import { User, validateLogin } from "../models/user.model.js";
import _  from "lodash"; // type error to be fixed with "npm install -D @types/lodash"
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import  config  from "config";

export async function loginUser(req: Request, res: Response) {
    try {
        const { error } = validateLogin(req.body);

        if (error) {
            return res.status(400).send(error.details[0]?.message);
        }

        let user = await User.findOne({email: req.body.email});
        if (!user) return res.status(400).send("Invalid email or Password");
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).send("Invalid email or Password");

        const token = user.generateAuthToken();
        return res.header('x-auth-token', token).status(201).send(_.pick(user, ['_id','name', 'email']));

    } catch (error) {
        console.error(error);

        return res.status(500).send("Failed to register user.");
    }
}

