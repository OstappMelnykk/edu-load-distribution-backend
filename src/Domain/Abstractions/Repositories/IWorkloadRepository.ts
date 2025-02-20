import {WorkloadModel} from "../../Models/WorkloadModel";
import {Types} from "mongoose";
import {WorkloadCreateDTO} from "../../DTOs/WorkloadDTOs/WorkloadCreateDTO";
import {WorkloadUpdateDTO} from "../../DTOs/WorkloadDTOs/WorkloadUpdateDTO";

export interface IWorkloadRepository {
    GetAll(): Promise<WorkloadModel[]>;

    GetById(id: Types.ObjectId): Promise<WorkloadModel | null>;

    Create(workloadCreateDTO: WorkloadCreateDTO): Promise<Types.ObjectId>;

    Update(id: Types.ObjectId, workloadUpdateDTO: WorkloadUpdateDTO): Promise<Types.ObjectId>;

    DeleteAll(): Promise<string>;

    DeleteById(id: Types.ObjectId): Promise<Types.ObjectId>;
}
