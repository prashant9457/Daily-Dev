import type { Request, Response } from "express";
import validateUser, { User } from "../models/user.model.js";
import _  from "lodash"; // type error to be fixed with "npm install -D @types/lodash"
import bcrypt from 'bcrypt'; // same as above
import { isUserOnline } from "../websocket/presence.js";

function escapeRegex(value: string) { // avoids .* to get all users
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); 
}

export async function registerUser(req: Request, res: Response) {
    try {
        const { error } = validateUser(req.body);

        if (error) {
            return res.status(400).send(error.details[0]?.message);
        }

        let user = await User.findOne({
            $or: [
                { email: req.body.email },
                { username: req.body.username }
            ]
        });

        if (user) {
            return res.status(400).send("Email or username already registered.");
        }
        // pick only the needed things using lodash
        user = new User(_.pick(req.body, ['name', 'username', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        
        const token = user.generateAuthToken();
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        })
        
        // picking only valid thigns to resend to client i.e. not password
        return res.status(201).send(_.pick(user, ["_id", "name", "username", "email"]));
    
    } catch (error) {
        console.error(error);

        return res.status(500).send("Failed to register user.");
    }
}

export async function searchUser(req: Request, res: Response) {
    try {
        const username = req.query.username as string;

        if(!username) {
            return res.status(400).json({
                message: "username must contain at least 2 characters",
            });
        }

        const search = escapeRegex(username);

        const users = await User.find({
            username: {
                $regex: `^${search}`,
                $options: "i", //case insensitive
            },
        }).select("_id name username").limit(10);

        return res.status(200).json({data: users});
    } catch (error) {
        console.error(error);

        return res.status(500).json({message: "Failed to search users"});
    }
    
}

export async function getUsersPresence(req: Request, res: Response) {
    const { userIds } = req.body;

    if(!Array.isArray(userIds) || userIds.length ===  0 || userIds.length > 20) {
        return res.status(400).send("userIds must be an array at max 20 size");
    }

    const presence = userIds.map((userId: string) => ({
        userId,
        online: isUserOnline(userId),
    }));
    return res.send(presence);
}