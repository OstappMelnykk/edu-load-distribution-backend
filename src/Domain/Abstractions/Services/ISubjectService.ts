import {SubjectModel} from "../../Models/SubjectModel";
import { SubjectCreateDTO } from "../../DTOs/SubjectDTOs/SubjectCreateDTO";
import { SubjectUpdateDTO } from "../../DTOs/SubjectDTOs/SubjectUpdateDTO";
import {Types} from "mongoose";

export interface ISubjectService {
    getAllSubjects(): Promise<SubjectModel[]>;

    getSubjectById(id: Types.ObjectId): Promise<SubjectModel | null>;

    createSubject(subjectCreateDTO: SubjectCreateDTO): Promise<Types.ObjectId>;

    updateSubject(id: Types.ObjectId, subjectUpdateDTO: SubjectUpdateDTO): Promise<Types.ObjectId>;

    deleteAllSubjects(): Promise<string>;

    deleteSubjectById(id: Types.ObjectId): Promise<Types.ObjectId>;
}