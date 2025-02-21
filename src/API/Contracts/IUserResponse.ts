import {Types} from "mongoose";

export interface IUserResponse {
    id: Types.ObjectId,
    email: string,
    password: string,
    roles: string[],
    teacherId: Types.ObjectId
}


