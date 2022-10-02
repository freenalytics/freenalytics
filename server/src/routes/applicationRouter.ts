import express from 'express';
import { verifyUser } from '../middleware/auth';
import { onlySupportedMethods } from '../middleware/routes';
import * as applicationController from '../controllers/applicationController';

const router = express.Router();

router.get('/', verifyUser, applicationController.getAll);
router.all('/', onlySupportedMethods('GET'));

export default router;
