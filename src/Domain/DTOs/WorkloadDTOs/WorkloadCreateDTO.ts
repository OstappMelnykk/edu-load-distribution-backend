import {Types} from "mongoose";

export type WorkloadCreateDTO = {
    teacherId: Types.ObjectId;
    subjectId: Types.ObjectId;
    groupNumber: string;
};
