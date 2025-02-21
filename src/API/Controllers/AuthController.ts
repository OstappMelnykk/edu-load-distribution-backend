import {Request, Response} from "express";
import {inject, injectable} from "tsyringe";
import {User} from "../../DataAccess/Schemas/User";
import bcrypt from "bcryptjs";
import {Role} from "../../DataAccess/Schemas/Role";
import {Types} from "mongoose";
import {TeacherCreateDTO} from "../../Domain/DTOs/TeacherDTOs/TeacherCreateDTO";
import {TeacherService} from "../../Application/Services/TeacherService";
import {UserCreateDTO} from "../../Domain/DTOs/UserDTOs/UserCreateDTO";
import {UserService} from "../../Application/Services/UserService";
import {ITeacherService} from "../../Domain/Abstractions/Services/ITeacherService";
import {IUserService} from "../../Domain/Abstractions/Services/IUserService";
import {validationResult} from "express-validator";
import {IUserEntity} from "../../DataAccess/Entities/IUserEntity";
import {secret} from "../../../config";
import jwt from 'jsonwebtoken';
import {UserModel} from "../../Domain/Models/UserModel";
import {IUserResponse} from "../Contracts/IUserResponse";
import dotenv from "dotenv";

dotenv.config();

const generateAccessToken = (id: Types.ObjectId, roles: string[]) => {
    const payload = {
        id,
        roles
    };
    return jwt.sign(payload, secret.secret, {expiresIn: "24h"});
}


@injectable()
class AuthController {

    private readonly _teacherService: ITeacherService;
    private readonly _userService: IUserService;

    constructor(@inject(TeacherService) teacherService: ITeacherService,
                @inject(UserService) userService: IUserService) {
        this._teacherService = teacherService
        this._userService = userService
    }


    public getAllUsers = async (req: Request, res: Response) => {
        try {
            const users: UserModel[]  = await this._userService.getAllUsers()

            var responce: IUserResponse[] = users.map(user => ({
                id: user.id,
                email: user.email,
                password: user.password,
                roles: user.roles,
                teacherId: user.teacherId,
            }));

            res.send(responce);
        }
        catch (error) {
            const err = error as Error;
            res.send(err.message);
        }
    }





    /*
        "email": "",
        "password": ""
    */
    public async registration(req: Request, res: Response) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message: "registration error", errors});
            }

            const {email, password} = req.body;
            const teacherCreateDTO: TeacherCreateDTO = req.body;

            const condidate = await User.findOne({ email: email });

            if(condidate){
                return res.status(400).json({message: 'User with such email already exists'});
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: "USER" });
            //const userRole = await Role.findOne({ value: "ADMIN" });

            try {
                let newTeacherId: Types.ObjectId = await this._teacherService.createTeacher(teacherCreateDTO);

                let userCreateDTO: UserCreateDTO = {
                    email: email,
                    password: hashPassword,
                    roles: [userRole!.value],
                    teacherId:  newTeacherId
                }

                const newSbujectId: Types.ObjectId = await this._userService.createUser(userCreateDTO);
                //res.status(201).send({ id: newSubjectId });
                return res.status(201).json({message: `User registered succesfully with ID: ${newSbujectId}`});

            } catch (error) {
                const err = error as Error;
                res.status(500).send(err.message);
            }

        }
        catch (error) {
            console.error(error);
            res.status(400).json({message: "Registration error"});
        }
    }


    public async login(req: Request, res: Response){
        try {
            const {email, password} = req.body;
            const user: IUserEntity | null = await User.findOne({ email: email });

            if(!user){
                return res.status(400).json({message: 'User with such email: ${email} not found'});
            }

            const validPassword = bcrypt.compareSync(password, user!.password);

            if (!validPassword){
                return res.status(400).json({message: 'Wrong password'});
            }

            const token = generateAccessToken(user._id as Types.ObjectId, user.roles)

            return res.json({token});
        }
        catch (error) {
            console.error(error);
            res.status(400).json({message: "Login error"});
        }
    }




}

export default AuthController;