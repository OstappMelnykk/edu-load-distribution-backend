import express, {Request, Response} from "express";
import TeacherController from "../Controllers/TeacherController";

import {container} from "tsyringe";
import roleMiddleware from "../Middlewares/roleMiddleware";


const router = express.Router();

/**
 * @swagger
 * /teacher/get:
 *   get:
 *     summary: Get all teachers
 *     tags: [Teacher]
 *     security:
 *       - BearerAuth: []
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
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/get', roleMiddleware(['ADMIN', 'USER']), (req: Request, res: Response) => {
    container.resolve(TeacherController).getAllTeachers(req, res);
});

/**
 * @swagger
 * /teacher/get/{id}:
 *   get:
 *     summary: Get a teacher by ID
 *     tags: [Teacher]
 *     security:
 *       - BearerAuth: []
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
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal server error
 */
router.get('/get/:id', roleMiddleware(['ADMIN', 'USER']), (req: Request, res: Response) => {
    container.resolve(TeacherController).getTeacherById(req, res);
});






/**
 * @swagger
 * /teacher/get/{id}/workloads:
 *   get:
 *     summary: Get workloads for a teacher by ID
 *     tags: [Teacher]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Teacher ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of workloads for the teacher
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   teacherId:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       middleName:
 *                         type: string
 *                       degree:
 *                         type: string
 *                       position:
 *                         type: string
 *                       experience:
 *                         type: number
 *                   subjectId:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       hours:
 *                         type: number
 *                   groupNumber:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Teacher or workloads not found
 *       500:
 *         description: Internal server error
 */
router.get('/get/:id/workloads', roleMiddleware(['ADMIN', 'USER']), (req: Request, res: Response) => {
    container.resolve(TeacherController).getTeacherByIdWorkloads(req, res);
});


/**
 * @swagger
 * /teacher/create:
 *   post:
 *     summary: Create a new teacher
 *     tags: [Teacher]
 *     security:
 *       - BearerAuth: []
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
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/create', roleMiddleware(['ADMIN']), (req: Request, res: Response) => {
    container.resolve(TeacherController).createTeacher(req, res);
});

/**
 * @swagger
 * /teacher/update/{id}:
 *   put:
 *     summary: Update an existing teacher
 *     tags: [Teacher]
 *     security:
 *       - BearerAuth: []
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
 *       400:
 *         description: Invalid request body or parameters
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal server error
 */
router.put('/update/:id', roleMiddleware(['ADMIN']), (req: Request, res: Response) => {
    container.resolve(TeacherController).updateTeacher(req, res);
});

/**
 * @swagger
 * /teacher/delete:
 *   delete:
 *     summary: Delete all teachers
 *     tags: [Teacher]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Teachers deleted successfully
 *       403:
 *          description: Unauthorized, only ADMIN can perform this action
 *       500:
 *         description: Internal server error
 */
router.delete('/delete', roleMiddleware(['ADMIN']), (req: Request, res: Response) => {
    container.resolve(TeacherController).deleteAllTeachers(req, res);
});

/**
 * @swagger
 * /teacher/delete/{id}:
 *   delete:
 *     summary: Delete a teacher by ID
 *     tags: [Teacher]
 *     security:
 *       - BearerAuth: []
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
 *       403:
 *         description: Unauthorized, only ADMIN can perform this action
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', roleMiddleware(['ADMIN']), (req: Request, res: Response) => {
    container.resolve(TeacherController).deleteTeacherById(req, res);
});

export default router;