import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {secret} from "../../../config";

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(403).json({ message: "Unauthorized" });
            return;
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(403).json({ message: "Unauthorized" });
            return;
        }

        const decodedToken = jwt.verify(token, secret.secret as string);
        req.user = decodedToken;

        next();
    } catch (e) {
        console.error("JWT Verification Error:", e);
        res.status(403).json({ message: "Unauthorized" });
    }
};

export default authMiddleware;
