import {Subject} from "../../Models/Subject";
import {Types} from "mongoose";
import {SubjectCreateDTO} from "../../DTOs/SubjectDTOs/SubjectCreateDTO";
import {SubjectUpdateDTO} from "../../DTOs/SubjectDTOs/SubjectUpdateDTO";

export interface ISubjectRepository {
    getAllSubjects(): Promise<Subject[]>;

    getSubjectById(id: Types.ObjectId): Promise<Subject>;

    createSubject(subjectCreateDTO: SubjectCreateDTO): Promise<Types.ObjectId>;

    updateSubject(id: Types.ObjectId, subjectUpdateDTO: SubjectUpdateDTO): Promise<Types.ObjectId>;

    deleteAllSubjects(): Promise<string>;

    deleteSubjectById(id: Types.ObjectId): Promise<Types.ObjectId>;
}