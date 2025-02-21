import {Types} from "mongoose";

export interface ITeacher {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    middleName: string;
    degree: 'degree_1' | 'degree_2' | 'degree_3' | 'degree_4' | 'degree_5';
    position: 'position_1' | 'position_2' | 'position_3' | 'position_4' | 'position_5';
    experience: number;
}
