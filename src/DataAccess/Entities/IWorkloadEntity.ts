import {Document, Types} from 'mongoose';

export interface IWorkloadEntity extends Document {
    teacherId: Types.ObjectId,
    subjectId: Types.ObjectId,
    groupNumber: string,
    year: number
}