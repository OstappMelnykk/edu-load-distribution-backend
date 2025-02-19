import {Teacher} from "../../Models/Teacher";
import {Types} from "mongoose";
import {TeacherCreateDTO} from "../../DTOs/TeacherDTOs/TeacherCreateDTO";
import {TeacherUpdateDTO} from "../../DTOs/TeacherDTOs/TeacherUpdateDTO";

export interface ITeacherRepository {
    GetAll(): Promise<Teacher[]>;

    GetById(id: Types.ObjectId): Promise<Teacher>;

    Create(teacherCreateDTO: TeacherCreateDTO): Promise<Types.ObjectId>;

    Update(id: Types.ObjectId, teacherUpdateDTO: TeacherUpdateDTO): Promise<Types.ObjectId>;

    DeleteAll(): Promise<string>;

    DeleteById(id: Types.ObjectId): Promise<Types.ObjectId>;
}