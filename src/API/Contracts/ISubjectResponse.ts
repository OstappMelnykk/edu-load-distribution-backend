import {Types} from "mongoose";

export interface ISubjectResponse {
    id: Types.ObjectId
    name: string
    lectureHours: number
    practiceHours: number
    totalHours: number
}