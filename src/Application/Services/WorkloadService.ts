import { Types } from "mongoose";
import {IWorkloadService} from "../../Domain/Abstractions/Services/IWorkloadService";
import {WorkloadCreateDTO} from "../../Domain/DTOs/WorkloadDTOs/WorkloadCreateDTO";
import {WorkloadUpdateDTO} from "../../Domain/DTOs/WorkloadDTOs/WorkloadUpdateDTO";
import {WorkloadModel} from "../../Domain/Models/WorkloadModel";
import {IWorkloadRepository} from "../../Domain/Abstractions/Repositories/IWorkloadRepository";

export class WorkloadService implements IWorkloadService {

    private readonly _workloadRepository: IWorkloadRepository;

    public constructor(workloadRepository: IWorkloadRepository) {
        this._workloadRepository = workloadRepository;
    }

    getAllWorkloads(): Promise<WorkloadModel[]> {
        return this._workloadRepository.GetAll();
    }
    getWorkloadById(id: Types.ObjectId): Promise<WorkloadModel | null> {
        return this._workloadRepository.GetById(id)
    }
    createWorkload(workloadCreateDTO: WorkloadCreateDTO): Promise<Types.ObjectId> {
        return this._workloadRepository.Create(workloadCreateDTO);
    }
    updateWorkload(id: Types.ObjectId, workloadUpdateDTO: WorkloadUpdateDTO): Promise<Types.ObjectId> {
        return this._workloadRepository.Update(id, workloadUpdateDTO);
    }
    deleteAllWorkloads(): Promise<string> {
        return this._workloadRepository.DeleteAll();
    }
    deleteWorkloadById(id: Types.ObjectId): Promise<Types.ObjectId> {
        return this._workloadRepository.DeleteById(id)
    }

}