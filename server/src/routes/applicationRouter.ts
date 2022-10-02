import express from 'express';
import { verifyUser } from '../middleware/auth';
import { onlySupportedMethods } from '../middleware/routes';
import { jsonBodyRequired } from '../middleware/controller';
import * as applicationController from '../controllers/applicationController';

const router = express.Router();

router.get('/', verifyUser, applicationController.getAll);
router.post('/', verifyUser, jsonBodyRequired, applicationController.create);
router.all('/', onlySupportedMethods('GET', 'POST'));

router.get('/:domain', verifyUser, applicationController.getByDomain);
router.delete('/:domain', verifyUser, applicationController.deleteByDomain);
router.all('/:domain', onlySupportedMethods('GET', 'DELETE'));

export default router;
