import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { routeNotFound } from '../middleware/routes';
import authRouter from './authRouter';
import userRouter from './userRouter';

const api = express.Router();
api.use(bodyParser.json());
api.use(passport.initialize());

api.use('/auth', authRouter);
api.use('/users', userRouter);

api.all('*', routeNotFound);

export default api;
