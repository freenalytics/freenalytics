import express from 'express';
import { verifyUser } from '../middleware/auth';
import { onlySupportedMethods } from '../middleware/routes';
import { jsonBodyRequired } from '../middleware/controller';
import * as applicationController from '../controllers/applicationController';

const router = express.Router();

router.get('/', verifyUser, applicationController.getAll);
router.post('/', verifyUser, jsonBodyRequired, applicationController.create);
router.all('/', onlySupportedMethods('GET', 'POST'));

export default router;
