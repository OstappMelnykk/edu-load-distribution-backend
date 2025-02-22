import {Request, Response} from "express";
import {TeacherService} from "../../Application/Services/TeacherService";
import {ITeacherResponse} from "../Contracts/ITeacherResponse";
import {TeacherModel} from "../../Domain/Models/TeacherModel";
import {inject, injectable} from "tsyringe";
import {Types} from "mongoose";
import {TeacherUpdateDTO} from "../../Domain/DTOs/TeacherDTOs/TeacherUpdateDTO";
import {TeacherCreateDTO} from "../../Domain/DTOs/TeacherDTOs/TeacherCreateDTO";
import {ITeacherService} from "../../Domain/Abstractions/Services/ITeacherService";
import {IWorkload} from "../Contracts/IWorkload";
import {Workload} from "../../DataAccess/Schemas/Workload";
import {IExtendedWorkloadResponse} from "../Contracts/IExtendedWorkloadResponse";

@injectable()
class TeacherController {
    private readonly _teacherService: ITeacherService;

    constructor(@inject(TeacherService) teacherService: ITeacherService) {
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


    public async getTeacherByIdWorkloads(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const workloads: IWorkload[] = await Workload.aggregate([
                {
                    $match: {
                        teacherId: new Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: 'teachers',
                        localField: 'teacherId',
                        foreignField: '_id',
                        as: 'teacherId'
                    }
                },
                {
                    $lookup: {
                        from: 'subjects',
                        localField: 'subjectId',
                        foreignField: '_id',
                        as: 'subjectId'
                    }
                },
                {
                    $unwind: '$teacherId'
                },
                {
                    $unwind: '$subjectId'
                }
            ]).exec();


            const response: IExtendedWorkloadResponse[] = workloads.map((workload) => ({
                id: workload._id,
                teacherId: {
                    id: workload.teacherId._id,
                    firstName: workload.teacherId.firstName,
                    lastName: workload.teacherId.lastName,
                    middleName: workload.teacherId.middleName,
                    degree: workload.teacherId.degree,
                    position: workload.teacherId.position,
                    experience: workload.teacherId.experience
                },
                subjectId: {
                    id: workload.subjectId._id,
                    name: workload.subjectId.name,
                    hours: workload.subjectId.hours
                },
                groupNumber: workload.groupNumber
            }));

            res.send(response);

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
