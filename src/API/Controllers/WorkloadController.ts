import {Request, Response} from "express";
import {IWorkloadResponse} from "../Contracts/IWorkloadResponse";
import {WorkloadService} from "../../Application/Services/WorkloadService";
import {WorkloadModel} from "../../Domain/Models/WorkloadModel";
import {inject, singleton} from "tsyringe";
import {Types} from "mongoose";
import {WorkloadCreateDTO} from "../../Domain/DTOs/WorkloadDTOs/WorkloadCreateDTO";
import {WorkloadUpdateDTO} from "../../Domain/DTOs/WorkloadDTOs/WorkloadUpdateDTO";

@singleton()
class WorkloadController {
    private readonly _workloadService: WorkloadService;

    constructor(@inject(WorkloadService) workloadService: WorkloadService) {
        this._workloadService = workloadService
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


    public getWorkloadById = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            const workload: WorkloadModel | null = await this._workloadService.getWorkloadById(new Types.ObjectId(id));
            if (!workload) {
                return res.status(404).send("Workload not found");
            }

            const response: IWorkloadResponse = {
                id: workload.id,
                teacherId: workload.teacherId,
                subjectId: workload.subjectId,
                groupNumber: workload.groupNumber
            };

            res.send(response);
        } catch (error) {
            const err = error as Error;
            res.status(500).send(err.message);
        }
    };

    public createWorkload = async (req: Request, res: Response) => {
        const workloadCreateDTO: WorkloadCreateDTO = req.body;
        try {
            const newWorkloadId: Types.ObjectId = await this._workloadService.createWorkload(workloadCreateDTO);

            res.status(201).send({ id: newWorkloadId });
        } catch (error) {
            const err = error as Error;
            res.status(500).send(err.message);
        }
    };

    public updateWorkload = async (req: Request, res: Response) => {
        const { id } = req.params;
        const workloadUpdateDTO: WorkloadUpdateDTO = req.body;
        try {
            const updatedWorkloadId: Types.ObjectId = await this._workloadService.updateWorkload(
                new Types.ObjectId(id),
                workloadUpdateDTO
            );

            if (!updatedWorkloadId) {
                return res.status(404).send("Workload not found");
            }

            res.send({ id: updatedWorkloadId });
        } catch (error) {
            const err = error as Error;
            res.status(500).send(err.message);
        }
    };

    public deleteAllWorkloads = async (req: Request, res: Response) => {
        try {
            const message:string = await this._workloadService.deleteAllWorkloads();
            res.send(message);
        } catch (error) {
            const err = error as Error;
            res.status(500).send(err.message);
        }
    };

    public deleteWorkloadById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const deletedWorkloadId = await this._workloadService.deleteWorkloadById(new Types.ObjectId(id))

            if (!deletedWorkloadId) {
                return res.status(404).send("Workload not found");
            }

            res.send({ id: deletedWorkloadId });
        } catch (error) {
            const err = error as Error;
            res.status(500).send(err.message);
        }
    };
}

export default WorkloadController;