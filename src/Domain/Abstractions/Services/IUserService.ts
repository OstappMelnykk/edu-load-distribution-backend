import {Types} from "mongoose";
import {UserCreateDTO} from "../../DTOs/UserDTOs/UserCreateDTO";
import {UserModel} from "../../Models/UserModel";

export interface IUserService {

    getAllUsers(): Promise<UserModel[]>;

    createUser(userCreateDTO: UserCreateDTO): Promise<Types.ObjectId>;

}