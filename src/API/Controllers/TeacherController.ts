import {Request, Response} from "express";
import {TeacherService} from "../../Application/Services/TeacherService";
import {ITeacherResponse} from "../Contracts/ITeacherResponse";
import {TeacherModel} from "../../Domain/Models/TeacherModel";
import {TeacherRepository} from "../../DataAccess/Repositories/TeacherRepository";
import {container, singleton} from "tsyringe";
import {SubjectService} from "../../Application/Services/SubjectService";

@singleton()
class TeacherController {
    private readonly _teacherService: TeacherService;

    constructor() {
        this._teacherService = container.resolve(TeacherService)
    }

    public getAllTeachers = async (req: Request, res: Response) => {
        try {
            const teachers: TeacherModel[]  = await this._teacherService.getAllTeachers()
            var responce: ITeacherResponse[] = teachers.map(teacher => ({
                id: teacher.id,
                firstName: teacher.firstName,
                lastName: teacher.lastName,
                middleName: teacher.middleName,
                degree: teacher.degree,
                position: teacher.position,
                experience: teacher.experience
            }));

            res.send(responce);
        }
        catch (error) {
            const err = error as Error;
            res.send(err.message);
        }
    }
}

export default container.resolve(TeacherController)