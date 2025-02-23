import {Request, Response} from "express";
import {TeacherService} from "../../Application/Services/TeacherService";
import {ITeacherResponse} from "../Contracts/ITeacherResponse";
import {TeacherModel} from "../../Domain/Models/TeacherModel";
import {inject, injectable} from "tsyringe";
import {Types} from "mongoose";
import {TeacherUpdateDTO} from "../../Domain/DTOs/TeacherDTOs/TeacherUpdateDTO";
import {TeacherCreateDTO} from "../../Domain/DTOs/TeacherDTOs/TeacherCreateDTO";
import {ITeacherService} from "../../Domain/Abstractions/Services/ITeacherService";
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
            const workloads = await Workload.aggregate([
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
                        as: 'teacher'
                    }
                },
                {
                    $unwind: { path: '$teacher', preserveNullAndEmptyArrays: true }
                },
                {
                    $lookup: {
                        from: 'subjects',
                        localField: 'subjectId',
                        foreignField: '_id',
                        as: 'subject'
                    }
                },
                {
                    $addFields: {
                        subjectId: { $toObjectId: "$subjectId" }
                    }
                },
                {
                    $unwind: { path: '$subject', preserveNullAndEmptyArrays: true }
                }

            ]).exec();

            console.log(workloads)


            const response: IExtendedWorkloadResponse[] = workloads.map((workload) => ({
                id: workload._id,
                teacherId: {
                    id: workload.teacher._id,
                    firstName: workload.teacher.firstName,
                    lastName: workload.teacher.lastName,
                    middleName: workload.teacher.middleName,
                    degree: workload.teacher.degree,
                    position: workload.teacher.position,
                    experience: workload.teacher.experience
                },
                subjectId: {
                    id: workload.subject._id,
                    name: workload.subject.name,
                    lectureHours: workload.subject.lectureHours,
                    practiceHours: workload.subject.practiceHours,
                    totalHours: workload.subject.totalHours,
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
