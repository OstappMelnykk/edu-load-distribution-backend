import express, {Request, Response} from "express";
import SubjectController from "../Controllers/SubjectController";
import {container} from "tsyringe";
import roleMiddleware from "../Middlewares/roleMiddleware";
const router = express.Router();

/**
 * @swagger
 * /subject/get:
 *   get:
 *     summary: Get all subjects
 *     tags: [Subject]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of subjects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   hours:
 *                     type: number
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/get', roleMiddleware(['ADMIN', 'USER']), (req: Request, res: Response) => {
    container.resolve(SubjectController).getAllSubjects(req, res);
});



/**
 * @swagger
 * /subject/get/{id}:
 *   get:
 *     summary: Get a subject by ID
 *     tags: [Subject]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Subject ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single subject
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 hours:
 *                   type: number
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Subject not found
 *       500:
 *         description: Internal server error
 */
router.get('/get/:id', roleMiddleware(['ADMIN', 'USER']), (req: Request, res: Response) => {
    container.resolve(SubjectController).getSubjectById(req, res);
});



/**
 * @swagger
 * /subject/create:
 *   post:
 *     summary: Create a new subject
 *     tags: [Subject]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               hours:
 *                 type: number
 *             required:
 *               - name
 *               - hours
 *     responses:
 *       201:
 *         description: Subject created successfully
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
    container.resolve(SubjectController).createSubject(req, res);
});



/**
 * @swagger
 * /subject/update/{id}:
 *   put:
 *     summary: Update an existing subject
 *     tags: [Subject]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Subject ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mathematics"
 *               hours:
 *                 type: number
 *                 example: 40
 *             required:
 *               - name
 *               - hours
 *     responses:
 *       200:
 *         description: Subject updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *       400:
 *         description: Invalid request body or parameters
 *       404:
 *         description: Subject not found
 *       500:
 *         description: Internal server error
 */
router.put('/update/:id', roleMiddleware(['ADMIN']), (req: Request, res: Response) => {
    container.resolve(SubjectController).updateSubject(req, res);
});




/**
 * @swagger
 * /subject/delete:
 *   delete:
 *     summary: Delete all subjects
 *     tags: [Subject]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Subjects deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All subjects have been deleted."
 *       403:
 *         description: Unauthorized, only ADMIN can perform this action
 *       500:
 *         description: Internal server error
 */
router.delete('/delete', roleMiddleware(['ADMIN']), (req, res) => {
    container.resolve(SubjectController).deleteAllSubjects(req, res);
});




/**
 * @swagger
 * /subject/delete/{id}:
 *   delete:
 *     summary: Delete a subject by ID
 *     tags: [Subject]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Subject ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subject deleted successfully
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
 *         description: Subject not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', roleMiddleware(['ADMIN']), (req: Request, res: Response) => {
    container.resolve(SubjectController).deleteSubjectById(req, res);
});

export default router;


//router.get('/get', ((req, res) => container.resolve(SubjectController).getAllSubjects(req, res)) as RequestHandler);
//router.get('/get/:id', ((req, res) => container.resolve(SubjectController).getSubjectById(req, res)) as RequestHandler);
//router.post('/create', ((req, res) => container.resolve(SubjectController).createSubject(req, res)) as RequestHandler);
//router.put('/update/:id', ((req, res) => container.resolve(SubjectController).updateSubject(req, res)) as RequestHandler);
//router.delete('/delete', ((req, res) => container.resolve(SubjectController).deleteAllSubjects(req, res)) as RequestHandler);
//router.delete('/delete/:id', ((req, res) => container.resolve(SubjectController).deleteSubjectById(req, res)) as RequestHandler);
