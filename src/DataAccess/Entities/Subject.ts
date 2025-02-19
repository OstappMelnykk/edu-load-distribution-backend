import { Schema, model, Types } from 'mongoose';

const SubjectSchema = new Schema({
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

const Subject = model('Subject', SubjectSchema);
export { Subject };
