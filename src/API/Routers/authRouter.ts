import express, {Request, Response} from "express";
import {container} from "tsyringe";
import AuthController from "../Controllers/AuthController";
import {check} from "express-validator";
import roleMiddleware from "../Middlewares/roleMiddleware";
import currentUserMiddleware from "../Middlewares/currentUserMiddleware";


const router = express.Router();


/**
 * @swagger
 * /auth/get:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users in the system.
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Error retrieving users.
 *       500:
 *         description: Internal server error.
 */
router.get('/get', roleMiddleware(['USER', 'ADMIN']), (req, res) => {
    container.resolve(AuthController).getAllUsers(req, res);
});

/**
 * @swagger
 * /auth/me/workloads:
 *   get:
 *     summary: Get current user's workloads
 *     description: Retrieves the workloads of the currently authenticated user, including details about the teacher and the subject.
 *     tags:
 *       - Me
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of workloads for the current user, including teacher and subject details.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the workload.
 *                   teacherId:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The unique identifier of the teacher.
 *                       firstName:
 *                         type: string
 *                         description: The first name of the teacher.
 *                       lastName:
 *                         type: string
 *                         description: The last name of the teacher.
 *                       middleName:
 *                         type: string
 *                         description: The middle name of the teacher.
 *                       degree:
 *                         type: string
 *                         description: The degree of the teacher.
 *                         enum: ['degree_1', 'degree_2', 'degree_3', 'degree_4', 'degree_5']
 *                       position:
 *                         type: string
 *                         description: The position of the teacher.
 *                         enum: ['position_1', 'position_2', 'position_3', 'position_4', 'position_5']
 *                       experience:
 *                         type: number
 *                         description: The years of experience of the teacher.
 *                   subjectId:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The unique identifier of the subject.
 *                       name:
 *                         type: string
 *                         description: The name of the subject.
 *                       lectureHours:
 *                         type: number
 *                         description: The number of lectureHours allocated for the subject.
 *                       practiceHours:
 *                         type: number
 *                         description: The number of practiceHours allocated for the subject.
 *                       totalHours:
 *                         type: number
 *                         description: The number of totalHours allocated for the subject.
 *                   groupNumber:
 *                     type: string
 *                     description: The group number associated with the workload.
 *       400:
 *         description: Error retrieving workloads for the current user.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 */
router.get('/me/workloads', roleMiddleware(['USER', 'ADMIN']), currentUserMiddleware, (req, res) => {
    container.resolve(AuthController).getCurrentUserWorkloads(req, res);
});




/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get the current authenticated user
 *     description: Retrieves the profile of the currently authenticated user.
 *     tags:
 *       - Me
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     email:
 *                       type: string
 *                       example: "user_admin@ukr.net"
 *                     password:
 *                       type: string
 *                       example: "user_admin"  # Пароль користувача
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "ADMIN"
 *                     teacherId:
 *                       type: string
 *                       example: "T12345"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       401:
 *         description: Unauthorized. Invalid or missing authentication token.
 *       500:
 *         description: Internal server error.
 */
router.get('/me', roleMiddleware(['ADMIN', 'USER']), currentUserMiddleware, async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    res.json({ user: req.user }); // Відправляємо відповідь
});






/*{
    "email": "",
    "password": "",
    "firstName": "",
    "lastName": "",
    "middleName": "",
    "degree": "",
    "position": "",
    "experience": 0
}*/



/**
 * @swagger
 * /auth/registration:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with email and password, and creates a teacher record.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user_admin@ukr.net"
 *               password:
 *                 type: string
 *                 example: "user_admin"
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               middleName:
 *                 type: string
 *                 example: "Smith"
 *               degree:
 *                 type: string
 *                 example: "degree_1"
 *               position:
 *                 type: string
 *                 example: "position_1"
 *               experience:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Invalid input or user already exists.
 *       500:
 *         description: Internal server error.
 */
router.post('/registration', [
    check('email', "Email is not correct!!").notEmpty().isEmail(),
    check('password', "Password is not correct!!").isLength({min: 2, max: 10}),
], (req: Request, res: Response) => {
    container.resolve(AuthController).registration(req, res);
});



/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Logs in a user by email and password, and returns an authentication token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user_admin@ukr.net"
 *               password:
 *                 type: string
 *                 example: "user_admin"
 *     responses:
 *       200:
 *         description: Login successful, returns a token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "JWT_TOKEN"
 *       400:
 *         description: Invalid email or password.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', (req: Request, res: Response) => {
    container.resolve(AuthController).login(req, res);
});


export default router;