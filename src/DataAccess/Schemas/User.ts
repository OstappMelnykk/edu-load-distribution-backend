import mongoose, {model} from "mongoose";
import {IUserEntity} from "../Entities/IUserEntity";

const UserSchema = new mongoose.Schema<IUserEntity>({
    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    roles: [{
        type: String,
        ref: "Role"
    }],

    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    }
});

const User = model<IUserEntity>('User', UserSchema);
export { User };