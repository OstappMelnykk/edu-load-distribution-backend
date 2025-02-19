import { Types } from 'mongoose';
export class Subject {

    constructor(
        private _id: Types.ObjectId,
        private _name: string,
        private _hours: number
    ) { }

    public static Create( id: Types.ObjectId,
                   name: string,
                   hours: number
    ): { instance: Subject | null, error: string }
    {
        let error: string = ""

        if (!name || name.length < 1 || name.length > 250) error += "Name is not correct!\n";
        if (!hours || hours < 0 || isNaN(hours)) error += "Hours is not correct!\n";

        if (error) return { instance: null, error: error };

        return {
            instance: new Subject(id, name, hours),
            error: error
        }
    }


    public get id(){
        return this._id
    }
    public get name(): string {
        return this._name;
    }
    public get hours(): number {
        return this._hours;
    }
}