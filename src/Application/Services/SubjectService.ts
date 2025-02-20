import { Types } from "mongoose";
import {ISubjectService} from "../../Domain/Abstractions/Services/ISubjectService";
import {SubjectCreateDTO} from "../../Domain/DTOs/SubjectDTOs/SubjectCreateDTO";
import {SubjectUpdateDTO} from "../../Domain/DTOs/SubjectDTOs/SubjectUpdateDTO";
import {SubjectModel} from "../../Domain/Models/SubjectModel";
import {ISubjectRepository} from "../../Domain/Abstractions/Repositories/ISubjectRepository";
import {inject, injectable} from "tsyringe";
import {SubjectRepository} from "../../DataAccess/Repositories/SubjectRepository";

@injectable()
export class SubjectService implements ISubjectService {

    private readonly _subjectRepository: ISubjectRepository;

    public constructor(@inject(SubjectRepository) subjectRepository: ISubjectRepository) {
        this._subjectRepository = subjectRepository;
    }

    getAllSubjects(): Promise<SubjectModel[]> {
        return this._subjectRepository.GetAll()
    }
    getSubjectById(id: Types.ObjectId): Promise<SubjectModel | null> {
        return this._subjectRepository.GetById(id)
    }
    createSubject(subjectCreateDTO: SubjectCreateDTO): Promise<Types.ObjectId> {
        return this._subjectRepository.Create(subjectCreateDTO)
    }
    updateSubject(id: Types.ObjectId, subjectUpdateDTO: SubjectUpdateDTO): Promise<Types.ObjectId> {
        return this._subjectRepository.Update(id, subjectUpdateDTO)
    }
    deleteAllSubjects(): Promise<string> {
        return this._subjectRepository.DeleteAll()
    }
    deleteSubjectById(id: Types.ObjectId): Promise<Types.ObjectId> {
        return this._subjectRepository.DeleteById(id)
    }

}