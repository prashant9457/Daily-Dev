import type { Request, Response } from "express";
import { User, validateLogin } from "../models/user.model.js";
import _  from "lodash"; // type error to be fixed with "npm install -D @types/lodash"
import bcrypt from 'bcrypt'; 


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
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        })
        return res.status(200).send(_.pick(user, ['_id','name', 'email']));

    } catch (error) {
        console.error(error);

        return res.status(500).send("Failed to register user.");
    }
}

export async function getCurrentUser(req: Request, res: Response) {
    try {

        const user = await User.findById(req.user._id).select("_id name email")

        if(!user) return res.status(404).send("User not found");

        return res.status(200).send(user);

    } catch (error) {
        console.log(error);

        return res.status(500).send("Failed to fetch user.");
    }
}
