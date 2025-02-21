import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import {secret} from "../../../config";
import {Types} from "mongoose";
import {User} from "../../DataAccess/Schemas/User";
import {IUserEntity} from "../../DataAccess/Entities/IUserEntity";
import {IUserResponse} from "../Contracts/IUserResponse";
import {UserMapper} from "../../DataAccess/Mappers/UserMapper";
import {UserModel} from "../../Domain/Models/UserModel";


interface CustomJwtPayload extends JwtPayload {
    _id: Types.ObjectId;
}

const currentUserMiddleware = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
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

        const decodedToken  = jwt.verify(token, secret.secret) as CustomJwtPayload;

        const userEntities: IUserEntity[] = await User.aggregate([
            { $match: { _id: new Types.ObjectId(decodedToken.id) } }
        ]);

        if (userEntities.length === 0){
            res.status(404).json({ message: 'User not found' });
            return
        }



        const userModel: UserModel = UserMapper.EntityToDomain(userEntities[0]);

        const response: IUserResponse = {
            id: userModel.id,
            email: userModel.email,
            password: userModel.password,
            roles: userModel.roles,
            teacherId: userModel.teacherId
        };

        req.user = response

        next();



    } catch (error) {
        res.status(403).json({ message: 'Unauthorized', error });
        return
    }
};

export default currentUserMiddleware;