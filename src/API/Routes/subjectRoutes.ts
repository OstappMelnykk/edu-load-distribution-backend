import express from "express";
import SubjectController from "../Controllers/SubjectController";

const router = express.Router();

router.get('/', SubjectController.getAllSubjects)

export default router;