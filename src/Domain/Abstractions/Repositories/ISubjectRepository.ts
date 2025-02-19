import {Subject} from "../../Models/Subject";
import {Types} from "mongoose";
import {SubjectCreateDTO} from "../../DTOs/SubjectDTOs/SubjectCreateDTO";
import {SubjectUpdateDTO} from "../../DTOs/SubjectDTOs/SubjectUpdateDTO";

export interface ISubjectRepository {
    GetAll(): Promise<Subject[]>;

    GetById(id: Types.ObjectId): Promise<Subject>;

    Create(subjectCreateDTO: SubjectCreateDTO): Promise<Types.ObjectId>;

    Update(id: Types.ObjectId, subjectUpdateDTO: SubjectUpdateDTO): Promise<Types.ObjectId>;

    DeleteAll(): Promise<string>;

    DeleteById(id: Types.ObjectId): Promise<Types.ObjectId>;
}