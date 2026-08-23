import jwt from "jsonwebtoken";
import config from "config";

interface DecodedToken {
    _id: string;
}

export function verifyToken(token: string): DecodedToken {
    return jwt.verify(
        token,
        config.get<string>("jwtPrivateKey")
    ) as DecodedToken;
}