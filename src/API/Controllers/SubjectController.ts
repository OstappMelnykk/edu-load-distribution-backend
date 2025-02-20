import { Request, Response } from 'express';
import {SubjectService} from "../../Application/Services/SubjectService";
import {ISubjectResponse} from "../Contracts/ISubjectResponse";
import {SubjectRepository} from "../../DataAccess/Repositories/SubjectRepository";

class SubjectController {
    private readonly _subjectService: SubjectService;

    constructor(subjectService: SubjectService) {
        this._subjectService =  subjectService
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

export default new SubjectController(new SubjectService(new SubjectRepository()));