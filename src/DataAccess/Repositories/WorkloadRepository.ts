import { Types } from "mongoose";
import {IWorkloadRepository} from "../../Domain/Abstractions/Repositories/IWorkloadRepository";
import {WorkloadCreateDTO} from "../../Domain/DTOs/WorkloadDTOs/WorkloadCreateDTO";
import {WorkloadUpdateDTO} from "../../Domain/DTOs/WorkloadDTOs/WorkloadUpdateDTO";
import {WorkloadModel} from "../../Domain/Models/WorkloadModel";
import {Workload} from "../Schemas/Workload";
import {IWorkloadEntity} from "../Entities/IWorkloadEntity";
import {WorkloadMapper} from "../Mappers/WorkloadMapper";
import {injectable} from "tsyringe";


@injectable()
export class WorkloadRepository implements IWorkloadRepository {
    async GetAll(): Promise<WorkloadModel[]> {
        const workloadEntities: IWorkloadEntity[] = await Workload.find();
        return workloadEntities.map(workloadEntity => WorkloadMapper.EntityToDomain(workloadEntity));
    }


    async GetById(id: Types.ObjectId): Promise<WorkloadModel | null> {
        const workloadEntities: IWorkloadEntity[] = await Workload.aggregate([
            { $match: { _id: id } }
        ]);

        if (workloadEntities.length === 0) return null;

        return WorkloadMapper.EntityToDomain(workloadEntities[0]);
    }

    async Create(workloadCreateDTO: WorkloadCreateDTO): Promise<Types.ObjectId> {
        const workloadEntity: IWorkloadEntity = new Workload({
            teacherId: workloadCreateDTO.teacherId,
            subjectId: workloadCreateDTO.subjectId,
            groupNumber: workloadCreateDTO.groupNumber,

        });

        const savedWorkload = await workloadEntity.save();
        return savedWorkload._id as Types.ObjectId;
    }


    async Update(id: Types.ObjectId, workloadUpdateDTO: WorkloadUpdateDTO): Promise<Types.ObjectId> {
        const updatedWorkload = await Workload.findByIdAndUpdate(
            id,
            { $set: workloadUpdateDTO },  // Оновлюємо лише ті поля, що передані
            { new: true }  // Повертаємо оновлений документ
        );

        if (!updatedWorkload) throw new Error('Workload not found');

        return updatedWorkload._id as Types.ObjectId;
    }


    async DeleteAll(): Promise<string> {
        const result = await Workload.deleteMany({});
        return `${result.deletedCount} workloads deleted`;
    }


    async DeleteById(id: Types.ObjectId): Promise<Types.ObjectId> {
        const deletedWorkload = await Workload.findByIdAndDelete(id);

        if (!deletedWorkload) throw new Error('workload not found');  // Якщо не знайдений об'єкт, кидаємо помилку

        return deletedWorkload._id as Types.ObjectId;  // Повертаємо id видаленого документа
    }
}