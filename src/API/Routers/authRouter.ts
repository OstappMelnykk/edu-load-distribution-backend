import express, {Request, Response} from "express";
import {container} from "tsyringe";
import AuthController from "../Controllers/AuthController";
import {check} from "express-validator";
import authMiddleware from "../Middlewares/authMiddleware";
import roleMiddleware from "../Middlewares/roleMiddleware";


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
router.get('/get', roleMiddleware(['USER']), (req, res) => {
    container.resolve(AuthController).getAllUsers(req, res);
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
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "pass123"
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
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
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