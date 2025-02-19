import {Types} from "mongoose";

type WorkloadUpdateDTO = {
    teacherId?: Types.ObjectId;
    subjectId?: Types.ObjectId;
    groupNumber?: string;
};
