import { Schema, model } from 'mongoose';
import {IWorkloadEntity} from "../Entities/IWorkloadEntity";


const WorkloadSchema = new Schema<IWorkloadEntity>({
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    groupNumber: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20
    },
    year: {
        type: Number,
        required: true,
        min: 1950,
        max: 2025,
    }
});

const Workload = model<IWorkloadEntity>('Workload', WorkloadSchema);
export { Workload };
