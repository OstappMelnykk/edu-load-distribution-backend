import { Request, Response } from 'express';
import {SubjectService} from "../../Application/Services/SubjectService";
import {ISubjectResponse} from "../Contracts/ISubjectResponse";
import {SubjectRepository} from "../../DataAccess/Repositories/SubjectRepository";
import {container, singleton} from "tsyringe";

@singleton()
class SubjectController {
    private readonly _subjectService: SubjectService;

    constructor() {
        this._subjectService = container.resolve(SubjectService);
    }

    public getAllSubjects = async (req: Request, res: Response) => {
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
}

export default container.resolve(SubjectController);