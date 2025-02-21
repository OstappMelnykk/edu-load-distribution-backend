import {Types} from "mongoose";
import {UserCreateDTO} from "../../DTOs/UserDTOs/UserCreateDTO";
import {UserModel} from "../../Models/UserModel";

export interface IUserRepository {

    GetAll(): Promise<UserModel[]>;

    Create(userCreateDTO: UserCreateDTO): Promise<Types.ObjectId>;

}