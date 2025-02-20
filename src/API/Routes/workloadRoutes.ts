import express from "express";
import WorkloadController from "../Controllers/WorkloadController";


const router = express.Router();

router.get('/', WorkloadController.getAllWorkloads)

export default router;