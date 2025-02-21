import {Types} from "mongoose";
import {IUserEntity} from "../Entities/IUserEntity";
import {UserModel} from "../../Domain/Models/UserModel";

export class UserMapper {

    public static EntityToDomain(userEntity: IUserEntity): UserModel{

        const { instance, error } = UserModel.Create(
            userEntity._id as Types.ObjectId,
            userEntity.email,
            userEntity.password,
            userEntity.roles,
            userEntity.teacherId,
        );

        if (error) throw new Error(error);

        return instance as UserModel;
    }

    public static DomainToEntity(userModel: UserModel): IUserEntity {
        return {
            _id: userModel.id,
            email: userModel.email,
            password: userModel.password,
            roles: userModel.roles,
            teacherId: userModel.teacherId,
        } as IUserEntity;
    }

}