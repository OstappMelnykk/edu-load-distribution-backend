import {Subject} from "./Subject";
import {Teacher} from "./Teacher";

export class Workload {
    constructor(
        private _id: number,
        private _teacher: Teacher,
        private _subject: Subject,
        private _groupNumber: string,
    ) {}

    public static Create( id: number,
                   teacher: Teacher,
                   subject: Subject,
                   groupNumber: string
    ): { instance: Workload | null, error: string }
    {
        let error: string = ""

        if (!teacher) error += "Teacher is not correct!\n";
        if (!subject) error += "Subject is not correct!\n";
        if (!groupNumber || groupNumber.length < 1 || groupNumber.length > 20)
            error += "GroupNumber is not correct!\n";

        if (error) return { instance: null, error: error };

        return {
            instance: new Workload(id, teacher, subject, groupNumber),
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
