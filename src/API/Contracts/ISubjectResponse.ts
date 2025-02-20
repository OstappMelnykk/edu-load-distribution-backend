import {Types} from "mongoose";

export interface ISubjectResponse {
    id: Types.ObjectId,
    name: string,
    hours: number,
}