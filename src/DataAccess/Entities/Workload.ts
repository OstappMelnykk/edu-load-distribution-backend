import { Schema, model, Types } from 'mongoose';
import { Teacher } from './Teacher';
import { Subject } from './Subject';

const WorkloadSchema = new Schema({
    teacher: {
        type: Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    subject: {
        type: Types.ObjectId,
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

const Workload = model('Workload', WorkloadSchema);
export { Workload };
