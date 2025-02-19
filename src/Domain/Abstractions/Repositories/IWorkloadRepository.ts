import {Workload} from "../../Models/Workload";
import {Types} from "mongoose";
import {WorkloadCreateDTO} from "../../DTOs/WorkloadDTOs/WorkloadCreateDTO";
import {WorkloadUpdateDTO} from "../../DTOs/WorkloadDTOs/WorkloadUpdateDTO";

export interface IWorkloadRepository {
    GetAll(): Promise<Workload[]>;

    GetById(id: Types.ObjectId): Promise<Workload>;

    Create(workloadCreateDTO: WorkloadCreateDTO): Promise<Types.ObjectId>;

    Update(id: Types.ObjectId, workloadUpdateDTO: WorkloadUpdateDTO): Promise<Types.ObjectId>;

    DeleteAll(): Promise<string>;

    DeleteById(id: Types.ObjectId): Promise<Types.ObjectId>;
}
