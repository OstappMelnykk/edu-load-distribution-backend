import {Types} from "mongoose";

export class TeacherModel {

    constructor(
        private _id: Types.ObjectId,
        private _firstName: string,
        private _lastName: string,
        private _middleName: string,
        private _degree: string,
        private _position: string,
        private _experience: number
    ) { }

    public static Create( id: Types.ObjectId,
                          firstName: string,
                          lastName: string,
                          middleName: string,
                          degree: string,
                          position: string,
                          experience: number
    ): { instance: TeacherModel | null, error: string }
    {
        let error: string = ""

        if (!firstName || firstName.length < 2 || firstName.length > 30) error += "FirstName is not correct!\n";
        if (!lastName || lastName.length < 2 || lastName.length > 30) error += "LastName is not correct!\n";
        if (!middleName || middleName.length < 2 || middleName.length > 30) error += "MiddleName is not correct!\n";
        if (!degree ) error += "Degree is not correct!\n";
        if (!position) error += "Position is not correct!\n";
        if (!experience || experience < 0 || experience > 70) error += "Experience is not correct!\n";

        if (error) return { instance: null, error: error };

        return {
            instance:
                new TeacherModel( id,
                             firstName,
                             lastName,
                             middleName,
                             degree,
                             position,
                             experience
                ),
            error: error
        }
    }


    public get id(){
        return this._id
    }
    public get firstName(): string {
        return this._firstName;
    }
    public get lastName(): string {
        return this._lastName;
    }
    public get middleName(): string {
        return this._middleName;
    }
    public get degree(): string {
        return this._degree;
    }
    public get position(): string {
        return this._position;
    }
    public get experience(): number {
        return this._experience;
    }
}