import {Request, Response} from "express";
import {TeacherService} from "../../Application/Services/TeacherService";
import {ITeacherResponse} from "../Contracts/ITeacherResponse";
import {TeacherModel} from "../../Domain/Models/TeacherModel";
import {inject, singleton} from "tsyringe";
import {Types} from "mongoose";
import {TeacherUpdateDTO} from "../../Domain/DTOs/TeacherDTOs/TeacherUpdateDTO";
import {TeacherCreateDTO} from "../../Domain/DTOs/TeacherDTOs/TeacherCreateDTO";

@singleton()
class TeacherController {
    private readonly _teacherService: TeacherService;

    constructor(@inject(TeacherService) teacherService: TeacherService) {
        this._teacherService = teacherService
    }

    public async getAllTeachers(req: Request, res: Response) {
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


    public async getTeacherById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const teacher: TeacherModel | null = await this._teacherService.getTeacherById(new Types.ObjectId(id));
            if (teacher) {
                const response: ITeacherResponse = {
                    id: teacher.id,
                    firstName: teacher.firstName,
                    lastName: teacher.lastName,
                    middleName: teacher.middleName,
                    degree: teacher.degree,
                    position: teacher.position,
                    experience: teacher.experience,
                };
                res.send(response);
            } else {
                res.status(404).send("Teacher not found");
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).send(err.message);
        }
    }

    public async createTeacher(req: Request, res: Response) {
        const teacherCreateDTO: TeacherCreateDTO = req.body;
        try {
            const newTeacherId: Types.ObjectId = await this._teacherService.createTeacher(teacherCreateDTO);
            res.status(201).send({ id: newTeacherId });
        } catch (error) {
            const err = error as Error;
            res.status(500).send(err.message);
        }
    }

    public async updateTeacher(req: Request, res: Response) {
        const { id } = req.params;
        const teacherUpdateDTO: TeacherUpdateDTO = req.body;
        try {
            const updatedTeacherId: Types.ObjectId = await this._teacherService.updateTeacher(
                new Types.ObjectId(id),
                teacherUpdateDTO
            );
            res.send({ id: updatedTeacherId });
        } catch (error) {
            const err = error as Error;
            res.status(500).send(err.message);
        }
    }

    public async deleteAllTeachers(req: Request, res: Response) {
        try {
            const message: string = await this._teacherService.deleteAllTeachers();
            res.send({ message });
        } catch (error) {
            const err = error as Error;
            res.status(500).send(err.message);
        }
    }

    public async deleteTeacherById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const deletedTeacherId: Types.ObjectId = await this._teacherService.deleteTeacherById(
                new Types.ObjectId(id)
            );
            res.send({ id: deletedTeacherId });
        } catch (error) {
            const err = error as Error;
            res.status(500).send(err.message);
        }
    }
}

export default TeacherController;
