import express from 'express';
import { verifyUser } from '../middleware/auth';
import { onlySupportedMethods } from '../middleware/routes';
import { jsonBodyRequired } from '../middleware/controller';
import * as applicationController from '../controllers/applicationController';

const router = express.Router();

router.route('/')
  .get(verifyUser, applicationController.getAll)
  .post(verifyUser, jsonBodyRequired, applicationController.create)
  .all(onlySupportedMethods('GET', 'POST'));

router.route('/:domain')
  .get(verifyUser, applicationController.getByDomain)
  .patch(verifyUser, jsonBodyRequired, applicationController.updateByDomain)
  .delete(verifyUser, applicationController.deleteByDomain)
  .all(onlySupportedMethods('GET', 'PATCH', 'DELETE'));

export default router;
