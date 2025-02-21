import express, {Request, Response} from "express";
import TeacherController from "../Controllers/TeacherController";

import {container} from "tsyringe";


const router = express.Router();

/**
 * @swagger
 * /teacher/get:
 *   get:
 *     summary: Get all teachers
 *     tags: [Teacher]
 *     responses:
 *       200:
 *         description: A list of teachers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   middleName:
 *                     type: string
 *                   degree:
 *                     type: string
 *                   position:
 *                     type: string
 *                   experience:
 *                     type: number
 *       500:
 *         description: Internal server error
 */
router.get('/get', (req: Request, res: Response) => {
    container.resolve(TeacherController).getAllTeachers(req, res);
});

/**
 * @swagger
 * /teacher/get/{id}:
 *   get:
 *     summary: Get a teacher by ID
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Teacher ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single teacher
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 middleName:
 *                   type: string
 *                 degree:
 *                   type: string
 *                 position:
 *                   type: string
 *                 experience:
 *                   type: number
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal server error
 */
router.get('/get/:id', (req: Request, res: Response) => {
    container.resolve(TeacherController).getTeacherById(req, res);
});

/**
 * @swagger
 * /teacher/create:
 *   post:
 *     summary: Create a new teacher
 *     tags: [Teacher]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               middleName:
 *                 type: string
 *               degree:
 *                 type: string
 *               position:
 *                 type: string
 *               experience:
 *                 type: number
 *             required:
 *               - firstName
 *               - lastName
 *               - degree
 *               - position
 *               - experience
 *     responses:
 *       201:
 *         description: Teacher created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.post('/create', (req: Request, res: Response) => {
    container.resolve(TeacherController).createTeacher(req, res);
});

/**
 * @swagger
 * /teacher/update/{id}:
 *   put:
 *     summary: Update an existing teacher
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Teacher ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               middleName:
 *                 type: string
 *               degree:
 *                 type: string
 *               position:
 *                 type: string
 *               experience:
 *                 type: number
 *             required:
 *               - firstName
 *               - lastName
 *               - degree
 *               - position
 *               - experience
 *     responses:
 *       200:
 *         description: Teacher updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.put('/update/:id', (req: Request, res: Response) => {
    container.resolve(TeacherController).updateTeacher(req, res);
});

/**
 * @swagger
 * /teacher/delete:
 *   delete:
 *     summary: Delete all teachers
 *     tags: [Teacher]
 *     responses:
 *       200:
 *         description: Teachers deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/delete', (req: Request, res: Response) => {
    container.resolve(TeacherController).deleteAllTeachers(req, res);
});

/**
 * @swagger
 * /teacher/delete/{id}:
 *   delete:
 *     summary: Delete a teacher by ID
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Teacher ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Teacher deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', (req: Request, res: Response) => {
    container.resolve(TeacherController).deleteTeacherById(req, res);
});

export default router;