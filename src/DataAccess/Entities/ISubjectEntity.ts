import { Document } from 'mongoose';

export interface ISubjectEntity extends Document {
    name: string;
    lectureHours: number;
    practiceHours: number;
    totalHours: number;
}
