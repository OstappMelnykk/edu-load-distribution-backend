import { Document } from 'mongoose';

export interface ISubjectEntity extends Document {
    name: string;
    hours: number;
}
