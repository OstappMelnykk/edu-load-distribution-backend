import {model, Schema} from "mongoose";
import {IRoleEntity} from "../Entities/IRoleEntity";

const RoleSchema = new Schema<IRoleEntity>({
    value: {
        type: String,
        unique: true,
        default: "USER"
    },

});

const Role = model<IRoleEntity>('Role', RoleSchema);
export { Role };
