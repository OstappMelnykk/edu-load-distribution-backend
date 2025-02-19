import {Types} from "mongoose";

export type WorkloadUpdateDTO = {
    teacherId?: Types.ObjectId;
    subjectId?: Types.ObjectId;
    groupNumber?: string;
};
