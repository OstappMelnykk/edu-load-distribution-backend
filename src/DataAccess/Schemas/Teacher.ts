import { Schema, model } from 'mongoose';
import {ITeacherEntity} from "../Entities/ITeacherEntity";

const TeacherSchema = new Schema<ITeacherEntity>({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    middleName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    degree: {
        type: String,
        required: true,
        enum: ['degree_1', 'degree_2', 'degree_3', 'degree_4', 'degree_5']
    },
    position: {
        type: String,
        required: true,
        enum: ['position_1', 'position_2', 'position_3', 'position_4', 'position_5']
    },
    experience: {
        type: Number,
        required: true,
        min: 0,
        max: 70
    }
});

const Teacher = model<ITeacherEntity>('Teacher', TeacherSchema);
export { Teacher };
