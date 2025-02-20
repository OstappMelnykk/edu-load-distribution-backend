import { Types } from "mongoose";
import {ITeacherRepository} from "../../Domain/Abstractions/Repositories/ITeacherRepository";
import {TeacherCreateDTO} from "../../Domain/DTOs/TeacherDTOs/TeacherCreateDTO";
import {TeacherUpdateDTO} from "../../Domain/DTOs/TeacherDTOs/TeacherUpdateDTO";
import {TeacherModel} from "../../Domain/Models/TeacherModel";
import {ITeacherEntity} from "../Entities/TeacherEntity";
import {Teacher} from "../Schemas/Teacher";
import {TeacherMapper} from "../Mappers/TeacherMapper";

export class TeacherRepository implements ITeacherRepository {
    async GetAll(): Promise<TeacherModel[]> {
        const teacherEntities: ITeacherEntity[] = await Teacher.find();
        return teacherEntities.map(teacherEntity => TeacherMapper.EntityToDomain(teacherEntity));
    }
    async GetById(id: Types.ObjectId): Promise<TeacherModel | null> {
        const teacherEntities: ITeacherEntity[] = await Teacher.aggregate([
            { $match: { _id: id } }
        ]);

        if (teacherEntities.length === 0) return null;

        return TeacherMapper.EntityToDomain(teacherEntities[0]);

    }
    async Create(teacherCreateDTO: TeacherCreateDTO): Promise<Types.ObjectId> {
        const teacherEntity: ITeacherEntity = new Teacher({
            firstName: teacherCreateDTO.firstName,
            lastName: teacherCreateDTO.lastName,
            middleName: teacherCreateDTO.middleName,
            degree: teacherCreateDTO.degree,
            position: teacherCreateDTO.position,
            experience: teacherCreateDTO.experience,
        });

        const savedTeacher = await teacherEntity.save();
        return savedTeacher._id as Types.ObjectId;
    }
    async Update(id: Types.ObjectId, teacherUpdateDTO: TeacherUpdateDTO): Promise<Types.ObjectId> {
        const updatedTeacher = await Teacher.findByIdAndUpdate(
            id,
            { $set: teacherUpdateDTO },
            { new: true }
        );

        if (!updatedTeacher) throw new Error('teacher not found');

        return updatedTeacher._id as Types.ObjectId;
    }
    async DeleteAll(): Promise<string> {
        const result = await Teacher.deleteMany({});
        return `${result.deletedCount} teachers deleted`;
    }
    async DeleteById(id: Types.ObjectId): Promise<Types.ObjectId> {
        const deletedTeacher = await Teacher.findByIdAndDelete(id);

        if (!deletedTeacher) throw new Error('Teacher not found');

        return deletedTeacher._id as Types.ObjectId;
    }
}