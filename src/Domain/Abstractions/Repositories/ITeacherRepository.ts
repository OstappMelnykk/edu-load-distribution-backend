import {TeacherModel} from "../../Models/TeacherModel";
import {Types} from "mongoose";
import {TeacherCreateDTO} from "../../DTOs/TeacherDTOs/TeacherCreateDTO";
import {TeacherUpdateDTO} from "../../DTOs/TeacherDTOs/TeacherUpdateDTO";

export interface ITeacherRepository {
    GetAll(): Promise<TeacherModel[]>;

    GetById(id: Types.ObjectId): Promise<TeacherModel | null>;

    Create(teacherCreateDTO: TeacherCreateDTO): Promise<Types.ObjectId>;

    Update(id: Types.ObjectId, teacherUpdateDTO: TeacherUpdateDTO): Promise<Types.ObjectId>;

    DeleteAll(): Promise<string>;

    DeleteById(id: Types.ObjectId): Promise<Types.ObjectId>;
}