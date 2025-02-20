import {SubjectModel} from "../../Models/SubjectModel";
import {Types} from "mongoose";
import {SubjectCreateDTO} from "../../DTOs/SubjectDTOs/SubjectCreateDTO";
import {SubjectUpdateDTO} from "../../DTOs/SubjectDTOs/SubjectUpdateDTO";

export interface ISubjectRepository {

    GetAll(): Promise<SubjectModel[]>;

    GetById(id: Types.ObjectId): Promise<SubjectModel | null>;

    Create(subjectCreateDTO: SubjectCreateDTO): Promise<Types.ObjectId>;

    Update(id: Types.ObjectId, subjectUpdateDTO: SubjectUpdateDTO): Promise<Types.ObjectId>;

    DeleteAll(): Promise<string>;

    DeleteById(id: Types.ObjectId): Promise<Types.ObjectId>;
}