import express, {Request, Response} from "express";
import {container} from "tsyringe";
import AuthController from "../Controllers/AuthController";
import {check} from "express-validator";
import authMiddleware from "../Middlewares/authMiddleware";
import roleMiddleware from "../Middlewares/roleMiddleware";


const router = express.Router();

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

router.post('/registration', [
    check('email', "Email is not correct!!").notEmpty().isEmail(),
    check('password', "Password is not correct!!").isLength({min: 2, max: 10}),
], (req: Request, res: Response) => {
    container.resolve(AuthController).registration(req, res);
});
router.post('/login', (req: Request, res: Response) => {
    container.resolve(AuthController).login(req, res);
});


export default router;