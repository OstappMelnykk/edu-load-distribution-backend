import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import dotenv from "dotenv";
import {secret} from "../../../config";



interface CustomJwtPayload extends JwtPayload {
    roles: string[];
}

const roleMiddleware = (roles: string[]) => {
    return function (req: Request, res: Response, next: NextFunction): void {
        if (req.method === "OPTIONS") {
            return next();
        }

        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {

                res.status(403).json({ message: "Unauthorized" });
                return
            }

            const token = authHeader.split(" ")[1];
            if (!token) {
                res.status(403).json({ message: "Unauthorized" });
                return
            }

            if (typeof jwt.verify(token, secret.secret) === "string") {
                res.status(403).json({ message: "Invalid token" });
                return
            }

            const decodedToken = jwt.verify(token, secret.secret) as CustomJwtPayload;

            const userRoles = decodedToken.roles;


            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })

            if (!hasRole) {
                res.status(403).json({ message: "You don't have access" });
                return
            }

            next();
        } catch (e) {
            console.error("JWT Verification Error:", e);
            res.status(403).json({ message: "Unauthorized" });
            return
        }
    };
};

export default roleMiddleware;


/*
const roleMiddleware = (roles: string[]) => {
    return function (req: Request, res: Response, next: NextFunction){
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

            const decodedToken = jwt.verify(token, secret.secret)

            if (typeof decodedToken === "string") {
                // Якщо повернувся рядок, це означає, що JWT не декодовано правильно
                res.status(403).json({ message: "Invalid token" });
                return;
            }

            const userRoles = decodedToken.roles as string[];

            let hasRole = false;

            userRoles.forEach(role => {
                if (role.includes(role)) {
                    hasRole = true;
                }
            })
            if (!hasRole) {
                return res.status(403).json({ message: "U don't have accces" });
            }
            next();
        } catch (e) {
            console.error("JWT Verification Error:", e);
            res.status(403).json({ message: "Unauthorized" });
        }
    }
};

export default roleMiddleware;
*/






/*


module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "Пользователь не авторизован"})
            }
            const {roles: userRoles} = jwt.verify(token, secret)
            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(403).json({message: "У вас нет доступа"})
            }
            next();
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
    }
};


*/
