import {Request, Response} from "express";
import {IWorkloadResponse} from "../Contracts/IWorkloadResponse";
import {WorkloadService} from "../../Application/Services/WorkloadService";
import {WorkloadModel} from "../../Domain/Models/WorkloadModel";
import {WorkloadRepository} from "../../DataAccess/Repositories/WorkloadRepository";
import {container, singleton} from "tsyringe";
import {TeacherService} from "../../Application/Services/TeacherService";

@singleton()
class WorkloadController {
    private readonly _workloadService: WorkloadService;

    constructor() {
        this._workloadService = container.resolve(WorkloadService)
    }

    public getAllWorkloads = async (req: Request, res: Response) => {
        try {
            const workloads: WorkloadModel[]  = await this._workloadService.getAllWorkloads()

            var responce: IWorkloadResponse[] = workloads.map(workload => ({
                id: workload.id,
                teacherId: workload.teacherId,
                subjectId: workload.subjectId,
                groupNumber: workload.groupNumber
            }));

            res.send(responce);
        }
        catch (error) {
            const err = error as Error;
            res.send(err.message);
        }
    }
}

export default container.resolve(WorkloadController);