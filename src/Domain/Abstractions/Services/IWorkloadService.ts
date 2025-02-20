import { WorkloadModel } from "../../Models/WorkloadModel";
import { WorkloadCreateDTO } from "../../DTOs/WorkloadDTOs/WorkloadCreateDTO";
import { WorkloadUpdateDTO } from "../../DTOs/WorkloadDTOs/WorkloadUpdateDTO";
import { Types } from "mongoose";

export interface IWorkloadService {
    getAllWorkloads(): Promise<WorkloadModel[]>;

    getWorkloadById(id: Types.ObjectId): Promise<WorkloadModel | null>;

    createWorkload(workloadCreateDTO: WorkloadCreateDTO): Promise<Types.ObjectId>;

    updateWorkload(id: Types.ObjectId, workloadUpdateDTO: WorkloadUpdateDTO): Promise<Types.ObjectId>;

    deleteAllWorkloads(): Promise<string>;

    deleteWorkloadById(id: Types.ObjectId): Promise<Types.ObjectId>;
}
