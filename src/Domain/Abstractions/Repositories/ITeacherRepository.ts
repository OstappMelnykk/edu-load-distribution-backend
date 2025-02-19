import {Teacher} from "../../Models/Teacher";
import {Types} from "mongoose";
import {TeacherCreateDTO} from "../../DTOs/TeacherDTOs/TeacherCreateDTO";
import {TeacherUpdateDTO} from "../../DTOs/TeacherDTOs/TeacherUpdateDTO";

export interface ITeacherRepository {
    getAllTeachers(): Promise<Teacher[]>;

    getTeacherById(id: Types.ObjectId): Promise<Teacher>;

    createTeacher(teacherCreateDTO: TeacherCreateDTO): Promise<Types.ObjectId>;

    updateTeacher(id: Types.ObjectId, teacherUpdateDTO: TeacherUpdateDTO): Promise<Types.ObjectId>;

    deleteAllTeachers(): Promise<string>;

    deleteTeacherById(id: Types.ObjectId): Promise<Types.ObjectId>;
}