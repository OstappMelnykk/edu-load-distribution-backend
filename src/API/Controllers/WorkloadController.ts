import {Request, Response} from "express";
import {IWorkloadResponse} from "../Contracts/IWorkloadResponse";
import {WorkloadService} from "../../Application/Services/WorkloadService";
import {WorkloadModel} from "../../Domain/Models/WorkloadModel";
import {WorkloadRepository} from "../../DataAccess/Repositories/WorkloadRepository";

class WorkloadController {
    private readonly _workloadService: WorkloadService;

    constructor(workloadService: WorkloadService) {
        this._workloadService =  workloadService
    }

    public getAllWorkloads = async (req: Request, res: Response) => {
        console.log("Getting all workloads");
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

export default new WorkloadController(new WorkloadService(new WorkloadRepository()));