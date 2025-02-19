import {Types} from "mongoose";

export class WorkloadModel {
    constructor(
        private _id: Types.ObjectId,
        private _teacher: Types.ObjectId,
        private _subject: Types.ObjectId,
        private _groupNumber: string,
    ) {}

    public static Create( id: Types.ObjectId,
                          teacher: Types.ObjectId,
                          subject: Types.ObjectId,
                          groupNumber: string
    ): { instance: WorkloadModel | null, error: string }
    {
        let error: string = ""

        if (!teacher) error += "Teacher is not correct!\n";
        if (!subject) error += "Subject is not correct!\n";
        if (!groupNumber || groupNumber.length < 1 || groupNumber.length > 20)
            error += "GroupNumber is not correct!\n";

        if (error) return { instance: null, error: error };

        return {
            instance: new WorkloadModel(id, teacher, subject, groupNumber),
            error: error
        }
    }

    public  get id(){
        return this._id
    }

    public get teacher(){
        return this._teacher
    }
    public get subject(){
        return this._subject
    }
    public get groupNumber(){
        return this._groupNumber
    }
}
