import { Request, Response } from 'express';
import {SubjectService} from "../../Application/Services/SubjectService";
import {ISubjectResponse} from "../Contracts/ISubjectResponse";
import {inject, injectable} from "tsyringe";
import {Types} from "mongoose";

@injectable()
export class SubjectController {

    private readonly _subjectService: SubjectService;

    constructor(@inject(SubjectService) subjectService: SubjectService) {
        this._subjectService = subjectService
    }

    public async getAllSubjects (req: Request, res: Response) {
        try {
            const subjects  = await this._subjectService.getAllSubjects()
            var responce: ISubjectResponse[] = subjects.map(subject => ({
                id: subject.id,
                name: subject.name,
                hours: subject.hours
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
            const subject = await this._subjectService.getSubjectById(new Types.ObjectId(id));
            if (!subject) {
                return res.status(404).send('Subject not found');
            }
            const response: ISubjectResponse = {
                id: subject.id,
                name: subject.name,
                hours: subject.hours
            };
            res.send(response);
        } catch (error) {
            const err = error as Error;
            res.status(500).send(err.message);
        }
    }

    public async createSubject(req: Request, res: Response) {
        const subjectCreateDTO = req.body;
        try {
            const newSubjectId = await this._subjectService.createSubject(subjectCreateDTO);
            res.status(201).send({ id: newSubjectId });
        } catch (error) {
            const err = error as Error;
            res.status(500).send(err.message);
        }
    }

    public async updateSubject(req: Request, res: Response) {
        const { id } = req.params;
        const subjectUpdateDTO = req.body;
        try {
            const updatedSubjectId = await this._subjectService.updateSubject(
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
            const result = await this._subjectService.deleteAllSubjects();
            res.send(result);
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