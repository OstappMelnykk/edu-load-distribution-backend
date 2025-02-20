import {Request, Response} from "express";
import {TeacherService} from "../../Application/Services/TeacherService";
import {ITeacherResponse} from "../Contracts/ITeacherResponse";
import {TeacherModel} from "../../Domain/Models/TeacherModel";
import {TeacherRepository} from "../../DataAccess/Repositories/TeacherRepository";

class TeacherController {
    private readonly _teacherService: TeacherService;

    constructor(teacherService: TeacherService) {
        this._teacherService =  teacherService
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

export default new TeacherController(new TeacherService(new TeacherRepository()));