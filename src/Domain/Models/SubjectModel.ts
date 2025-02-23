import { Types } from 'mongoose';

export class SubjectModel {

    constructor(
        private _id: Types.ObjectId,
        private _name: string,
        private _lectureHours: number,
        private _practiceHours: number,
        private _totalHours: number,
    ) { }

    public static Create( id: Types.ObjectId,
                   name: string,
                   lectureHours: number,
                   practiceHours: number,
                   totalHours: number,
    ): { instance: SubjectModel | null, error: string }
    {
        let error: string = ""

        if (!name || name.length < 1 || name.length > 50) error += "Name is not correct!\n";
        if (!lectureHours || lectureHours < 0 || isNaN(lectureHours)) error += "LectureHours is not correct!\n";
        if (!practiceHours || practiceHours < 0 || isNaN(practiceHours)) error += "PracticeHours is not correct!\n";
        if (!totalHours || totalHours < 0 || isNaN(totalHours)) error += "TotalHours is not correct!\n";

        if (error) return { instance: null, error: error };

        return {
            instance: new SubjectModel(
                id,
                name,
                lectureHours,
                practiceHours,
                totalHours
            ),
            error: error
        }
    }


    public get id(){
        return this._id
    }
    public get name(): string {
        return this._name;
    }
    public get lectureHours(): number{
        return this._lectureHours
    }
    public get practiceHours(): number{
        return this._practiceHours;
    }
    public get totalHours(): number{
        return this._totalHours;
    }

}