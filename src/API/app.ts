import "reflect-metadata";
import express, { Express } from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "../DataAccess/dbConnection";
import subjectRoutes from "./Routes/subjectRoutes";
import teacherRoutes from "./Routes/teacherRoutes";
import workloadRoutes from "./Routes/workloadRoutes";

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
                console.log(`Server running on port: ${process.env.API_PORT}`);
            })

            this.app.use("/subject", subjectRoutes);
            this.app.use("/teacher", teacherRoutes);
            this.app.use("/workload", workloadRoutes);

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