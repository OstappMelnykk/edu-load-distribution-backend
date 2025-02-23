import {Types} from "mongoose";
import {ISubject} from "./ISubject";
import {ITeacher} from "./ITeacher";

export interface IWorkload {
    _id: Types.ObjectId;
    teacherId: ITeacher;
    subjectId: ISubject;
    groupNumber: string;
    year: number;
}