import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/interfaces';

const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, 'username is required'],
            unique: [true, 'username is already taken'],
        },
        email: {
            type: String,
            required: [true, 'email is required'],
            unique: [true, 'email is already taken'],
        },
        password: {
            type: String,
            required: [true, 'password is required'],
        },
    },
    {
        timestamps: true, // createdAt, updatedAt
    },
);

export const UserModel = mongoose.model('users', UserSchema);
