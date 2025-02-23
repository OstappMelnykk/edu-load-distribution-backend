import { Types } from "mongoose";
import {ISubjectRepository} from "../../Domain/Abstractions/Repositories/ISubjectRepository";
import {SubjectCreateDTO} from "../../Domain/DTOs/SubjectDTOs/SubjectCreateDTO";
import {SubjectUpdateDTO} from "../../Domain/DTOs/SubjectDTOs/SubjectUpdateDTO";
import {ISubjectEntity} from "../Entities/ISubjectEntity";
import { SubjectModel } from "../../Domain/Models/SubjectModel";
import {Subject} from "../Schemas/Subject";
import {SubjectMapper} from "../Mappers/SubjectMapper";
import {injectable} from "tsyringe";
import {Workload} from "../Schemas/Workload";
import {ISubjectResponse} from "../../API/Contracts/ISubjectResponse";
import {ISubject} from "../../API/Contracts/ISubject";

@injectable()
export class SubjectRepository implements ISubjectRepository {


    async GetAll(): Promise<SubjectModel[]> {
        const subjectEntities: ISubjectEntity[] = await Subject.find();
        return subjectEntities.map(subjectEntity => SubjectMapper.EntityToDomain(subjectEntity));
    }

    async GetById(id: Types.ObjectId): Promise<SubjectModel | null> {
        const subjectEntities: ISubjectEntity[] = await Subject.aggregate([
            { $match: { _id: id } }
        ]);

        if (subjectEntities.length === 0) return null;

        return SubjectMapper.EntityToDomain(subjectEntities[0]);
    }


    async Create(subjectCreateDTO: SubjectCreateDTO): Promise<Types.ObjectId> {
        const subjectEntity: ISubjectEntity = new Subject({
            name: subjectCreateDTO.name,
            lectureHours: subjectCreateDTO.lectureHours,
            practiceHours: subjectCreateDTO.practiceHours
        });

        const savedSubject = await subjectEntity.save();
        return savedSubject._id as Types.ObjectId;
    }


    async Update(id: Types.ObjectId, subjectUpdateDTO: SubjectUpdateDTO): Promise<Types.ObjectId> {

        const oldSubject: ISubject = (await Subject.aggregate([
            {
                $match: {
                    _id: id
                }
            }]))[0];

        let updateType: {
            name: string;
            lectureHours: number;
            practiceHours: number;
            totalHours: number;
        } = {
            name: subjectUpdateDTO.name ?? oldSubject.name,
            lectureHours: subjectUpdateDTO.lectureHours ?? oldSubject.lectureHours,
            practiceHours: subjectUpdateDTO.practiceHours ?? oldSubject.practiceHours,
            totalHours: 0,
        };

        updateType.totalHours = (updateType.lectureHours || 0) + (updateType.practiceHours || 0);

        const updatedSubject = await Subject.findByIdAndUpdate(
            id,
            { $set: updateType },
            { new: true }
        );

        if (!updatedSubject) throw new Error('Subject not found');

        return updatedSubject._id as Types.ObjectId;
    }


    async DeleteAll(): Promise<string> {
        const deletedWorkloadResult = await Workload.deleteMany({});
        const result = await Subject.deleteMany({});
        //return `${result.deletedCount} subjects deleted`;
        return `${result.deletedCount} subjects deleted, ${deletedWorkloadResult.deletedCount} workloads deleted`;
    }


    async DeleteById(id: Types.ObjectId): Promise<Types.ObjectId> {
        const deletedSubject = await Subject.findByIdAndDelete(id);

        if (!deletedSubject) throw new Error('Subject not found');

        await Workload.deleteMany({ subjectId: id });

        return deletedSubject._id as Types.ObjectId;
    }
}