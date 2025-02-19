import {Types} from "mongoose";

type WorkloadCreateDTO = {
    teacherId: Types.ObjectId;
    subjectId: Types.ObjectId;
    groupNumber: string;
};
