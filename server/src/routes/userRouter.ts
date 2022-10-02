import express from 'express';
import { verifyUser } from '../middleware/auth';
import { onlySupportedMethods } from '../middleware/routes';
import { jsonBodyRequired } from '../middleware/controller';
import * as userController from '../controllers/userController';

const router = express.Router();

router.get('/', verifyUser, userController.getAll);
router.all('/', onlySupportedMethods('GET'));

router.get('/me', verifyUser, userController.getCurrent);
router.patch('/me', verifyUser, jsonBodyRequired, userController.updateCurrent);
router.all('/me', onlySupportedMethods('GET', 'PATCH'));

router.get('/:username', verifyUser, userController.getByUsername);
router.all('/:username', onlySupportedMethods('GET'));

export default router;
