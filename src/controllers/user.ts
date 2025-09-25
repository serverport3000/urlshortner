import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models/user';
import { LoginUserReq, RegisterUserReq } from '../types/types';
import { generateToken, hashPassword, verifyPassword } from '../utils/auth';
import jwt from 'jsonwebtoken';
import { IUser } from '../types/interfaces';

export const getAllUsers = async (
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    const users = await UserModel.find({}).lean();
    res.status(200).json({
        success: true,
        data: users,
    });
};

export const registerUser = async (
    req: Request,
    res: Response,
    _next: NextFunction,
) => {
    try {
        const newUser = req.body as RegisterUserReq; // @todo -> add yup or joi schema validator for request data
        newUser.password = await hashPassword(newUser.password);
        await UserModel.create(newUser);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
};

export const loginUser = async (
    req: Request,
    res: Response,
    _next: NextFunction,
) => {
    try {
        const { username, password } = req.body as LoginUserReq; // @todo -> add yup or joi schema validator for request data
        const user = await UserModel.findOne(
            { username },
            { username: 1, password: 1, _id: 1 },
        ).lean();
        if (!user)
            return res
                .status(400)
                .json({ success: false, message: 'Invalid username/password' });

        const isPasswordValid = await verifyPassword(user.password, password);
        if (!isPasswordValid)
            return res
                .status(400)
                .json({ success: false, message: 'Invalid username/password' });

        const tokenPayload = { id: user._id, username };
        const token = await generateToken(tokenPayload);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                token,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
};
