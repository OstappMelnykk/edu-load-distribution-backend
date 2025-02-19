import {Workload} from "../../Models/Workload";
import {Types} from "mongoose";
import {WorkloadCreateDTO} from "../../DTOs/WorkloadDTOs/WorkloadCreateDTO";
import {WorkloadUpdateDTO} from "../../DTOs/WorkloadDTOs/WorkloadUpdateDTO";

export interface IWorkloadRepository {
    getAllWorkloads(): Promise<Workload[]>;

    getWorkloadById(id: Types.ObjectId): Promise<Workload>;

    createWorkload(workloadCreateDTO: WorkloadCreateDTO): Promise<Types.ObjectId>;

    updateWorkload(id: Types.ObjectId, workloadUpdateDTO: WorkloadUpdateDTO): Promise<Types.ObjectId>;

    deleteAllWorkloads(): Promise<string>;

    deleteWorkloadById(id: Types.ObjectId): Promise<Types.ObjectId>;
}
