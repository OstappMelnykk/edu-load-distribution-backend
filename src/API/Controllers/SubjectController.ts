import { Request, Response } from 'express';
import {SubjectService} from "../../Application/Services/SubjectService";
import {ISubjectResponse} from "../Contracts/ISubjectResponse";
import {inject, injectable} from "tsyringe";
import {Types} from "mongoose";
import {SubjectModel} from "../../Domain/Models/SubjectModel";
import {SubjectCreateDTO} from "../../Domain/DTOs/SubjectDTOs/SubjectCreateDTO";
import {SubjectUpdateDTO} from "../../Domain/DTOs/SubjectDTOs/SubjectUpdateDTO";
import {ISubjectService} from "../../Domain/Abstractions/Services/ISubjectService";


@injectable()
export class SubjectController {

    private readonly _subjectService: ISubjectService;

    constructor(@inject(SubjectService) subjectService: ISubjectService) {
        this._subjectService = subjectService
    }

    public async getAllSubjects (req: Request, res: Response) {
        try {
            const subjects: SubjectModel[]  = await this._subjectService.getAllSubjects()
            var responce: ISubjectResponse[] = subjects.map(subject => ({
                id: subject.id,
                name: subject.name,
                lectureHours: subject.lectureHours,
                practiceHours: subject.practiceHours,
                totalHours: subject.totalHours,
            }));

            res.send(responce);
        }
        catch (error) {
            const err = error as Error;
            res.send(err.message);
        }
    }

    public async getSubjectById(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const subject: SubjectModel | null = await this._subjectService.getSubjectById(new Types.ObjectId(id));
            if (!subject) {
                return res.status(404).send('Subject not found');
            }
            const response: ISubjectResponse = {
                id: subject.id,
                name: subject.name,
                lectureHours: subject.lectureHours,
                practiceHours: subject.practiceHours,
                totalHours: subject.totalHours,
            };
            res.send(response);
        } catch (error) {
            const err = error as Error;
            res.status(500).send(err.message);
        }
    }

    public async createSubject(req: Request, res: Response) {
        const subjectCreateDTO: SubjectCreateDTO = req.body;
        try {
            const newSubjectId: Types.ObjectId = await this._subjectService.createSubject(subjectCreateDTO);
            res.status(201).send({ id: newSubjectId });
        } catch (error) {
            const err = error as Error;
            res.status(500).send(err.message);
        }
    }

    public async updateSubject(req: Request, res: Response) {
        const { id } = req.params;
        const subjectUpdateDTO: SubjectUpdateDTO = req.body;
        try {
            const updatedSubjectId: Types.ObjectId = await this._subjectService.updateSubject(
                new Types.ObjectId(id),
                subjectUpdateDTO
            );
            res.send({ id: updatedSubjectId });
        } catch (error) {
            const err = error as Error;
            res.status(500).send(err.message);
        }
    }

    public async deleteAllSubjects(req: Request, res: Response) {
        try {
            const message:string = await this._subjectService.deleteAllSubjects();
            res.send(message);
        } catch (error) {
            const err = error as Error;
            res.status(500).send(err.message);
        }
    }

    public async deleteSubjectById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const deletedSubjectId = await this._subjectService.deleteSubjectById(new Types.ObjectId(id));
            res.send({ id: deletedSubjectId });
        } catch (error) {
            const err = error as Error;
            res.status(500).send(err.message);
        }
    }
}

export default SubjectController;