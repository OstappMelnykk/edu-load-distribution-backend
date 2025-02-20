import { TeacherModel } from "../../Models/TeacherModel";
import { TeacherCreateDTO } from "../../DTOs/TeacherDTOs/TeacherCreateDTO";
import { TeacherUpdateDTO } from "../../DTOs/TeacherDTOs/TeacherUpdateDTO";
import { Types } from "mongoose";

export interface ITeacherService {
    getAllTeachers(): Promise<TeacherModel[]>;

    getTeacherById(id: Types.ObjectId): Promise<TeacherModel | null>;

    createTeacher(teacherCreateDTO: TeacherCreateDTO): Promise<Types.ObjectId>;

    updateTeacher(id: Types.ObjectId, teacherUpdateDTO: TeacherUpdateDTO): Promise<Types.ObjectId>;

    deleteAllTeachers(): Promise<string>;

    deleteTeacherById(id: Types.ObjectId): Promise<Types.ObjectId>;
}