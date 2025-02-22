import {Types} from "mongoose";
import {ITeacher} from "./ITeacher";
import {ISubject} from "./ISubject";
import {ISubjectResponse} from "./ISubjectResponse";
import {ITeacherResponse} from "./ITeacherResponse";

export interface IExtendedWorkloadResponse {
    id: Types.ObjectId;
    teacherId: ITeacherResponse;
    subjectId: ISubjectResponse;
    groupNumber: string;
}