
import {Types} from "mongoose";
import {ITeacherEntity} from "../Entities/ITeacherEntity";
import {TeacherModel} from "../../Domain/Models/TeacherModel";

export class TeacherMapper {

    public static EntityToDomain(teacherEntity: ITeacherEntity): TeacherModel{
        const { instance, error } = TeacherModel.Create(
            teacherEntity._id as Types.ObjectId,
            teacherEntity.firstName,
            teacherEntity.lastName,
            teacherEntity.middleName,
            teacherEntity.degree,
            teacherEntity.position,
            teacherEntity.experience
        );

        if (error) throw new Error(error);

        return instance as TeacherModel;
    }

    public static DomainToEntity(teacherModel: TeacherModel): ITeacherEntity {
        return {
            _id: teacherModel.id,
            firstName: teacherModel.firstName,
            lastName: teacherModel.lastName,
            middleName: teacherModel.middleName,
            degree: teacherModel.degree,
            position: teacherModel.position,
            experience: teacherModel.experience
        } as ITeacherEntity;
    }

}