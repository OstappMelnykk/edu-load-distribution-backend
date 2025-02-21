import {Document, Types} from "mongoose";

export interface IUserEntity extends Document {
    email: string
    password: string,
    roles: string[],
    teacherId: Types.ObjectId
}