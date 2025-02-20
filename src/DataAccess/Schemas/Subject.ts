import { Schema, model, Types } from 'mongoose';
import {ISubjectEntity} from "../Entities/SubjectEntity";

const SubjectSchema = new Schema<ISubjectEntity>({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    hours: {
        type: Number,
        required: true,
        min: 0
    }
});

const Subject = model<ISubjectEntity>('Subject', SubjectSchema);
export { Subject };
