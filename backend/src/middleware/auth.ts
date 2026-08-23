import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/verifyToken.js';

export default function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if(!token) return res.status(401).send('Access denied. No token provided.')
    
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch(ex) {
        res.status(400).send('Invalid token');
    }
}