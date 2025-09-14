import { NextFunction, Request, Response, Router } from 'express';
import { UserModel } from '../models/user';

export const userRouter = Router();

const userController = async (
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    const users = await UserModel.find({}).lean();
    res.status(200).json({
        success: true,
        data: users,
        message: 'Call of duty: Black Ops 7',
    }); // { success: true, message: '', error: '', data: [] }
};

userRouter.get('/', userController);
