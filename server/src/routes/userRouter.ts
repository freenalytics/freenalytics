import express from 'express';
import { verifyUser } from '../middleware/auth';
import * as userController from '../controllers/userController';

const router = express.Router();

router.get('/', verifyUser, userController.getUsers);

export default router;
