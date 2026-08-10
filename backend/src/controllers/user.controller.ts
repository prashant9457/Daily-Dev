import type { Request, Response } from "express";
import validateUser, { User } from "../models/user.model.js";
import _  from "lodash"; // type error to be fixed with "npm install -D @types/lodash"
import bcrypt from 'bcrypt'; // same as above

export async function registerUser(req: Request, res: Response) {
    try {
        const { error } = validateUser(req.body);

        if (error) {
            return res.status(400).send(error.details[0]?.message);
        }

        let user = await User.findOne({
            email: req.body.email
        });

        if (user) {
            return res.status(400).send("User already registered.");
        }
        // pick only the needed things using lodash
        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        
        const token = user.generateAuthToken();
        
        // picking only valid thigns to resend to client i.e. not password
        return res.header('x-auth-token', token).status(201).send(_.pick(user, ['_id','name', 'email']));
    
    } catch (error) {
        console.error(error);

        return res.status(500).send("Failed to register user.");
    }
}

