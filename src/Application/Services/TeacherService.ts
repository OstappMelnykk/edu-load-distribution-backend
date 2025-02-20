import { Types } from "mongoose";
import {ITeacherService} from "../../Domain/Abstractions/Services/ITeacherService";
import {TeacherCreateDTO} from "../../Domain/DTOs/TeacherDTOs/TeacherCreateDTO";
import {TeacherUpdateDTO} from "../../Domain/DTOs/TeacherDTOs/TeacherUpdateDTO";
import {TeacherModel} from "../../Domain/Models/TeacherModel";
import {ITeacherRepository} from "../../Domain/Abstractions/Repositories/ITeacherRepository";

export class TeacherService implements ITeacherService {

    private readonly _teacherRepository: ITeacherRepository;

    public constructor(teacherRepository: ITeacherRepository) {
        this._teacherRepository = teacherRepository;
    }

    getAllTeachers(): Promise<TeacherModel[]> {
         return this._teacherRepository.GetAll()
    }
    getTeacherById(id: Types.ObjectId): Promise<TeacherModel | null> {
        return this._teacherRepository.GetById(id)
    }
    createTeacher(teacherCreateDTO: TeacherCreateDTO): Promise<Types.ObjectId> {
        return this._teacherRepository.Create(teacherCreateDTO)
    }
    updateTeacher(id: Types.ObjectId, teacherUpdateDTO: TeacherUpdateDTO): Promise<Types.ObjectId> {
        return this._teacherRepository.Update(id, teacherUpdateDTO)
    }
    deleteAllTeachers(): Promise<string> {
        return this._teacherRepository.DeleteAll()
    }
    deleteTeacherById(id: Types.ObjectId): Promise<Types.ObjectId> {
        return this._teacherRepository.DeleteById(id)
    }

}