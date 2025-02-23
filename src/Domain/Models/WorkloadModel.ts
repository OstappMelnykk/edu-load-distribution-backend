import {Types} from "mongoose";

export class WorkloadModel {
    constructor(
        private _id: Types.ObjectId,
        private _teacherId: Types.ObjectId,
        private _subjectId: Types.ObjectId,
        private _groupNumber: string,
        private _year: number
    ) {}

    public static Create( id: Types.ObjectId,
                          teacherId: Types.ObjectId,
                          subjectId: Types.ObjectId,
                          groupNumber: string,
                          year: number
    ): { instance: WorkloadModel | null, error: string }
    {
        let error: string = ""


        if (!teacherId) error += "Teacher is not correct!\n\n";
        if (!subjectId) error += "Subject is not correct!\n";
        if (!groupNumber || groupNumber.length < 1 || groupNumber.length > 20)
            error += "GroupNumber is not correct!\n";
        if (!year || year > 2025 || year < 1950)
            error += "year is not correct!\n";

        if (error) return { instance: null, error: error };

        return {
            instance: new WorkloadModel(id, teacherId, subjectId, groupNumber, year),
            error: error
        }
    }

    public  get id(){
        return this._id
    }
    public get teacherId(){
        return this._teacherId
    }
    public get subjectId(){
        return this._subjectId
    }
    public get groupNumber(){
        return this._groupNumber
    }
    public get year(){
        return this._year
    }
}
