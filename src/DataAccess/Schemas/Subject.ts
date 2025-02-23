import {Schema, model, Types, UpdateQuery} from 'mongoose';
import {ISubjectEntity} from "../Entities/ISubjectEntity";

const SubjectSchema = new Schema<ISubjectEntity>({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    lectureHours: {
        type: Number,
        required: true,
        min: 0,
        max: 50
    },
    practiceHours: {
        type: Number,
        required: true,
        min: 0,
        max: 50
    },
    totalHours: {
        type: Number,
        required: true,
        min: 0,
        default: function() {
            return this.lectureHours + this.practiceHours;
        }
    }
});
/*
SubjectSchema.pre('insertMany', function(next, docs) {
    docs.forEach((doc: any) => {
        doc.totalHours = doc.lectureHours + doc.practiceHours;
    });
    next();
});

SubjectSchema.pre('save', function(next) {
    this.totalHours = this.lectureHours + this.practiceHours;
    next();
});



SubjectSchema.pre('findOneAndUpdate', function(this: any, next: any) {
    const update: Partial<ISubjectEntity> = this.getUpdate();

    if (update.lectureHours || update.practiceHours) {
        update.totalHours = (update.lectureHours || this.lectureHours) + (update.practiceHours || this.practiceHours);
    }

    next();
});*/


const Subject = model<ISubjectEntity>('Subject', SubjectSchema);
export { Subject };
