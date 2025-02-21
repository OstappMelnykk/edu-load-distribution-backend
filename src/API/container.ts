import "reflect-metadata";
import {container, scoped} from "tsyringe";
import { SubjectRepository } from "../DataAccess/Repositories/SubjectRepository";
import { SubjectService } from "../Application/Services/SubjectService";
import { TeacherRepository } from "../DataAccess/Repositories/TeacherRepository";
import { TeacherService } from "../Application/Services/TeacherService";
import { WorkloadRepository } from "../DataAccess/Repositories/WorkloadRepository";
import { WorkloadService } from "../Application/Services/WorkloadService";
import SubjectController from "./Controllers/SubjectController";

container.registerSingleton<SubjectRepository>(SubjectRepository);
container.registerSingleton<SubjectService>(SubjectService);

container.registerSingleton<TeacherRepository>(TeacherRepository);
container.registerSingleton<TeacherService>(TeacherService);

container.registerSingleton<WorkloadRepository>(WorkloadRepository);
container.registerSingleton<WorkloadService>(WorkloadService);

container.registerSingleton<SubjectController>(SubjectController);

//scoped
//container.register(SubjectController, { useClass: SubjectController });

