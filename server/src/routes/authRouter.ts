import express from 'express';
import { localAuthenticate } from '../middleware/auth';
import * as authController from '../controllers/authController';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', localAuthenticate, authController.login);

export default router;