import { Schema, model, Types } from 'mongoose';
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
    }
});

const Workload = model<IWorkloadEntity>('Workload', WorkloadSchema);
export { Workload };
