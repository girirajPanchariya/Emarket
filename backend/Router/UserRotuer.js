import express from 'express';
import { GetUserProfile, LoginUser, logout, RegisterUser, UpdateUserProfile, VerifyEmail } from '../Controller/UserController.js';
import { jwtTokenGenerateor } from '../others/Authentication.js'

export const UserRouter = express.Router();

UserRouter.post('/register',RegisterUser);
UserRouter.post('/verify',VerifyEmail);
UserRouter.post('/login',LoginUser);
UserRouter.get('/logout',jwtTokenGenerateor,logout);
UserRouter.get('/user',jwtTokenGenerateor,GetUserProfile);
UserRouter.put('/profile',jwtTokenGenerateor,UpdateUserProfile);

