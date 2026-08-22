import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';

export default function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if(!token) return res.status(401).send('Access denied. No token provided.')
    
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey')) as {_id: string};
        req.user = decoded;
        next();
    } catch(ex) {
        res.status(400).send('Invalid token');
    }
}