import express, {Request, Response} from "express";
import WorkloadController from "../Controllers/WorkloadController";
import {container} from "tsyringe";
import roleMiddleware from "../Middlewares/roleMiddleware";


const router = express.Router();


/**
* @swagger
* /workload/get:
*   get:
*     summary: Get all workloads
*     tags: [Workload]
*     security:
*         - BearerAuth: []
*     responses:
*       200:
*         description: A list of workloads
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
*                     type: string
*                   teacherId:
*                     type: string
*                   subjectId:
*                     type: string
*                   groupNumber:
*                     type: string
*       401:
*          description: Unauthorized
*       500:
*         description: Internal server error
*/
router.get('/get', roleMiddleware(['ADMIN', 'USER']), (req: Request, res: Response) => {
    container.resolve(WorkloadController).getAllWorkloads(req, res);
});

/**
 * @swagger
 * /workload/get/{id}:
 *   get:
 *     summary: Get a workload by ID
 *     tags: [Workload]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Workload ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single workload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 teacherId:
 *                   type: string
 *                 subjectId:
 *                   type: string
 *                 groupNumber:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Workload not found
 *       500:
 *         description: Internal server error
 */
router.get('/get/:id', roleMiddleware(['ADMIN', 'USER']), (req: Request, res: Response) => {
    container.resolve(WorkloadController).getWorkloadById(req, res);
});

/**
 * @swagger
 * /workload/create:
 *   post:
 *     summary: Create a new workload
 *     tags: [Workload]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teacherId:
 *                 type: string
 *               subjectId:
 *                 type: string
 *               groupNumber:
 *                 type: string
 *             required:
 *               - teacherId
 *               - subjectId
 *               - groupNumber
 *     responses:
 *       201:
 *         description: Workload created successfully
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
router.post('/create', roleMiddleware(['ADMIN', 'USER']), (req: Request, res: Response) => {
    container.resolve(WorkloadController).createWorkload(req, res);
});

/**
 * @swagger
 * /workload/update/{id}:
 *   put:
 *     summary: Update an existing workload
 *     tags: [Workload]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Workload ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teacherId:
 *                 type: string
 *               subjectId:
 *                 type: string
 *               groupNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Workload updated successfully
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
 *         description: Workload not found
 *       500:
 *         description: Internal server error
 */
router.put('/update/:id', roleMiddleware(['ADMIN', 'USER']), (req: Request, res: Response) => {
    container.resolve(WorkloadController).updateWorkload(req, res);
});

/**
 * @swagger
 * /workload/delete:
 *   delete:
 *     summary: Delete all workloads
 *     tags: [Workload]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Workloads deleted successfully
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.delete('/delete', roleMiddleware(['ADMIN', 'USER']), (req: Request, res: Response) => {
    container.resolve(WorkloadController).deleteAllWorkloads(req, res);
});

/**
 * @swagger
 * /workload/delete/{id}:
 *   delete:
 *     summary: Delete a workload by ID
 *     tags: [Workload]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Workload ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Workload deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Workload not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', roleMiddleware(['ADMIN', 'USER']),  (req: Request, res: Response) => {
    container.resolve(WorkloadController).deleteWorkloadById(req, res);
});




export default router;