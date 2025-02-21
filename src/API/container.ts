import "reflect-metadata";
import {container, scoped} from "tsyringe";
import { SubjectRepository } from "../DataAccess/Repositories/SubjectRepository";
import { SubjectService } from "../Application/Services/SubjectService";
import { TeacherRepository } from "../DataAccess/Repositories/TeacherRepository";
import { TeacherService } from "../Application/Services/TeacherService";
import { WorkloadRepository } from "../DataAccess/Repositories/WorkloadRepository";
import { WorkloadService } from "../Application/Services/WorkloadService";
import SubjectController from "./Controllers/SubjectController";
import AuthController from "./Controllers/AuthController";
import TeacherController from "./Controllers/TeacherController";
import WorkloadController from "./Controllers/WorkloadController";

container.registerSingleton<SubjectRepository>(SubjectRepository);
container.registerSingleton<SubjectService>(SubjectService);
container.registerSingleton<SubjectController>(SubjectController);

container.registerSingleton<TeacherRepository>(TeacherRepository);
container.registerSingleton<TeacherService>(TeacherService);
container.registerSingleton<TeacherController>(TeacherController);

container.registerSingleton<WorkloadRepository>(WorkloadRepository);
container.registerSingleton<WorkloadService>(WorkloadService);
container.registerSingleton<WorkloadController>(WorkloadController);

container.registerSingleton<AuthController>(AuthController);


//scoped
//container.register(SubjectController, { useClass: SubjectController });

