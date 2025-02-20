import express from "express";
import TeacherController from "../Controllers/TeacherController";

const router = express.Router();

router.get('/', TeacherController.getAllTeachers)

export default router;