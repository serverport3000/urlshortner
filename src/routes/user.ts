import { NextFunction, Request, Response, Router } from 'express';
import * as userController from '../controllers/user';

const userRouter = Router();

userRouter
    .get('/', userController.getAllUsers)
    .post('/register', userController.registerUser)
    .post('/login', userController.loginUser);

export default userRouter;
