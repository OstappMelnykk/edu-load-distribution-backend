import {inject, injectable} from "tsyringe";
import {IUserService} from "../../Domain/Abstractions/Services/IUserService";
import {IUserRepository} from "../../Domain/Abstractions/Repositories/IUserRepository";
import {UserRepository} from "../../DataAccess/Repositories/UserRepository";
import { Types } from "mongoose";
import { UserCreateDTO } from "../../Domain/DTOs/UserDTOs/UserCreateDTO";
import { UserModel } from "../../Domain/Models/UserModel";

@injectable()
export class UserService implements IUserService {
    private readonly _userRepository: IUserRepository;

    public constructor(@inject(UserRepository) userRepository: IUserRepository) {
        this._userRepository = userRepository;
    }

    getAllUsers(): Promise<UserModel[]> {
        return this._userRepository.GetAll()
    }

    createUser(userCreateDTO: UserCreateDTO): Promise<Types.ObjectId> {
       return this._userRepository.Create(userCreateDTO)
    }
}