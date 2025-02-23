
import {SubjectModel} from "../../Domain/Models/SubjectModel";
import {ISubjectEntity} from "../Entities/ISubjectEntity";
import {Types} from "mongoose";

export class SubjectMapper {

    public static EntityToDomain(subjectEntity: ISubjectEntity): SubjectModel{
        const { instance, error } = SubjectModel.Create(
            subjectEntity._id as Types.ObjectId,
            subjectEntity.name,
            subjectEntity.lectureHours,
            subjectEntity.practiceHours,
            subjectEntity.totalHours
        );

        if (error) throw new Error(error);

        return instance as SubjectModel;
    }

    public static DomainToEntity(subjectModel: SubjectModel): ISubjectEntity {
        return {
            _id: subjectModel.id,
            name: subjectModel.name,
            lectureHours: subjectModel.lectureHours,
            practiceHours: subjectModel.practiceHours,
            totalHours: subjectModel.totalHours,
        } as ISubjectEntity;
    }

}