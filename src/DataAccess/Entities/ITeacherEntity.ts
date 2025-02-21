import { Document } from 'mongoose';

export interface ITeacherEntity extends Document {
    firstName: string,
    lastName: string,
    middleName: string,
    degree: string,
    position: string,
    experience: number
}