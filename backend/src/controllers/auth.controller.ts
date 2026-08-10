import type { Request, Response } from "express";
import validateUser, { User } from "../models/user.model.js";

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

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        await user.save();

        return res.status(201).send(user);
    } catch (error) {
        console.error(error);

        return res.status(500).send("Failed to register user.");
    }
}

