import {Types} from "mongoose";

export type UserCreateDTO = {
    email: string
    password: string,
    roles: string[],
    teacherId: Types.ObjectId
};