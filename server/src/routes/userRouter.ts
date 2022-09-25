import express from 'express';
import { verifyUser } from '../middleware/auth';
import { onlySupportedMethods } from '../middleware/routes';
import * as userController from '../controllers/userController';

const router = express.Router();

router.get('/', verifyUser, userController.getUsers);
router.all('/', onlySupportedMethods('GET'));

export default router;
