import {Types} from "mongoose";

export class UserModel {

    constructor(
        private _id: Types.ObjectId,
        private _email: string,
        private _passwordHash: string,
        private _roles: string[],
        private _teacherId: Types.ObjectId
    ) { }

    public static Create( id: Types.ObjectId,
                          email: string,
                          passwordHash: string,
                          roles: string[],
                          teacherId: Types.ObjectId
    ): { instance: UserModel | null, error: string }
    {
        let error: string = ""

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email || !emailRegex.test(email)) {
            error += "Email is not correct!\n";
        }

        if (!teacherId || !(teacherId instanceof Types.ObjectId)) {
            error += "Teacher ID is not valid!\n";
        }

        if (error) return { instance: null, error: error };

        return {
            instance: new UserModel(id, email, passwordHash, roles, teacherId),
            error: error
        }
    }


    public get id(){
        return this._id
    }

    public get email(): string {
        return this._email;
    }

    public get password(): string {
        return this._passwordHash;
    }

    public get roles(): string[] {
        return this._roles;
    }

    public get teacherId(): Types.ObjectId {
        return this._teacherId;
    }

}