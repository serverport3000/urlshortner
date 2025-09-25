import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await argon2.hash(password); // converting password to irrev has to store it in db
    return hashedPassword;
};

export const verifyPassword = async (
    hashedPassword: string,
    inputPassword: string,
): Promise<boolean> => {
    const res = await argon2.verify(hashedPassword, inputPassword); // validating user input password with db password -> login
    return res;
};

export const generateToken = async (payload: any) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
        expiresIn: 30, // right now it's 30 days but ideally should be max 30 minutes and we should have the concept for refresh tokens.
    });
    console.log('token:', token);
    return token;
};
