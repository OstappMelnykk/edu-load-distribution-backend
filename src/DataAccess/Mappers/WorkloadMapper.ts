import {Types} from "mongoose";
import {WorkloadModel} from "../../Domain/Models/WorkloadModel";
import {IWorkloadEntity} from "../Entities/WorkloadEntity";

export class WorkloadMapper {

    public static EntityToDomain(subjectEntity: IWorkloadEntity): WorkloadModel{
        const { instance, error } = WorkloadModel.Create(
            subjectEntity._id as Types.ObjectId,
            subjectEntity.teacherId,
            subjectEntity.subjectId,
            subjectEntity.groupNumber,
        );

        if (error) throw new Error(error);

        return instance as WorkloadModel;
    }

    public static DomainToEntity(subjectModel: WorkloadModel): IWorkloadEntity {
        return {
            _id: subjectModel.id,
            teacherId: subjectModel.teacher,
            subjectId: subjectModel.subject,
            groupNumber: subjectModel.groupNumber,
        } as IWorkloadEntity;
    }

}