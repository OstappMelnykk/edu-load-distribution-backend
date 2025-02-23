import {Teacher} from "../DataAccess/Schemas/Teacher";
import {Subject} from "../DataAccess/Schemas/Subject";
import {Workload} from "../DataAccess/Schemas/Workload";
import {User} from "../DataAccess/Schemas/User";
import {Role} from "../DataAccess/Schemas/Role";

export const createData = async () => {


    /*const teachers = await Teacher.insertMany([
        { firstName: "John", lastName: "Doe", middleName: "Smith", degree: "degree_1", position: "position_1", experience: 10 },
        { firstName: "Jane", lastName: "Doe", middleName: "Johnson", degree: "degree_2", position: "position_2", experience: 8 }
    ]);*/


    await Role.insertMany([
        {value: "USER"},
        {value: "ADMIN"},
    ])

    /*const users = await User.insertMany([
        {},
        {},
    ])*/



    /*const subjects = await Subject.insertMany([
        { name: "Mathematics", lectureHours: 10, practiceHours: 15 },
        { name: "Physics", lectureHours: 3, practiceHours: 12 },
        { name: "Chemistry", lectureHours: 20, practiceHours: 10 },
        { name: "Chemistry", lectureHours: 20, practiceHours: 30 }
    ]);
*/



    /*await Workload.insertMany([
        { teacherId: teachers[0]._id, subjectId: subjects[0]._id, groupNumber: "101" },
        { teacherId: teachers[0]._id, subjectId: subjects[1]._id, groupNumber: "102" },
        { teacherId: teachers[1]._id, subjectId: subjects[2]._id, groupNumber: "103" }
    ]);*/

    console.log("Data inserted successfully");
};
