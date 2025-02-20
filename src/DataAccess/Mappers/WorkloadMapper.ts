import {Types} from "mongoose";
import {WorkloadModel} from "../../Domain/Models/WorkloadModel";
import {IWorkloadEntity} from "../Entities/WorkloadEntity";

export class WorkloadMapper {

    public static EntityToDomain(workloadEntity: IWorkloadEntity): WorkloadModel{
        console.log(workloadEntity.teacherId,)
        console.log(workloadEntity.subjectId,)

        const { instance, error } = WorkloadModel.Create(
            workloadEntity._id as Types.ObjectId,
            workloadEntity.teacherId,
            workloadEntity.subjectId,
            workloadEntity.groupNumber,
        );

        if (error) throw new Error(error);

        return instance as WorkloadModel;
    }

    public static DomainToEntity(workloadModel: WorkloadModel): IWorkloadEntity {
        return {
            _id: workloadModel.id,
            teacherId: workloadModel.teacherId,
            subjectId: workloadModel.subjectId,
            groupNumber: workloadModel.groupNumber,
        } as IWorkloadEntity;
    }

}