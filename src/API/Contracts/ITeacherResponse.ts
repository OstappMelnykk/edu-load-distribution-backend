import {Types} from "mongoose";

export interface ITeacherResponse {
    id: Types.ObjectId,
    firstName: string;
    lastName: string;
    middleName: string;
    degree: string;
    position: string;
    experience: number;
}

