import {Types} from "mongoose";

export interface IWorkloadResponse {
    id: Types.ObjectId,
    teacherId: Types.ObjectId;
    subjectId: Types.ObjectId;
    groupNumber: string;
}