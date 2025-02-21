import {injectable} from "tsyringe";
import {IUserRepository} from "../../Domain/Abstractions/Repositories/IUserRepository";
import { Types } from "mongoose";
import { UserCreateDTO } from "../../Domain/DTOs/UserDTOs/UserCreateDTO";
import {User} from "../Schemas/User";
import {IUserEntity} from "../Entities/IUserEntity";
import {UserModel} from "../../Domain/Models/UserModel";
import {UserMapper} from "../Mappers/UserMapper";

@injectable()
export class UserRepository implements IUserRepository {


    async GetAll(): Promise<UserModel[]> {
        const userEntities: IUserEntity[] = await User.find();
        return userEntities.map(userEntity => UserMapper.EntityToDomain(userEntity));
    }


    async Create(userCreateDTO: UserCreateDTO): Promise<Types.ObjectId> {

        const userEntity: IUserEntity = new User({
            email: userCreateDTO.email,
            password: userCreateDTO.password,
            roles: userCreateDTO.roles,
            teacherId: userCreateDTO.teacherId
        });

        const savedUser = await userEntity.save();
        return savedUser._id as Types.ObjectId;
    }
}