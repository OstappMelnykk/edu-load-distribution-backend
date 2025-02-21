import "reflect-metadata";
import express, { Express } from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "../DataAccess/dbConnection";
import subjectRouter from "./Routers/subjectRouter";
import teacherRouter from "./Routers/teacherRouter";
import workloadRouter from "./Routers/workloadRouter";
import swaggerUi from "swagger-ui-express";
import {swaggerSpec} from "./swagger";

dotenv.config();

class App {
    private app: Express;

    constructor() {
        this.app = express();
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static("public"));
        this.app.use(express.json());
        this.app.use(cors());
    }

    public init = async () => {

        try {
            await connectDB();

            this.app.listen(process.env.API_PORT, () => {
                console.log(`Server available at http://localhost:${process.env.API_PORT}`);
                console.log(`Swagger docs available at http://localhost:${process.env.API_PORT}/api-docs`);
            })

            this.app.get("/", (req, res) => {
                res.send("hello");
            })

            this.app.use("/subject", subjectRouter);
            this.app.use("/teacher", teacherRouter);
            this.app.use("/workload", workloadRouter);

            this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        } catch (error: unknown) {
            const err = error as Error;
            console.log(err.message);
        }
    }
}

export const app = new App();

app.init().then(() => {
    console.log("Server is ok");
}).catch(() => {
    console.log("Server is not ok");
})