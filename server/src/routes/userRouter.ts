import express from 'express';
import { verifyUser } from '../middleware/auth';
import { onlySupportedMethods } from '../middleware/routes';
import { jsonBodyRequired } from '../middleware/controller';
import * as userController from '../controllers/userController';

const router = express.Router();

router.route('/')
  .get(verifyUser, userController.getAll)
  .all(onlySupportedMethods('GET'));

router.route('/me')
  .get(verifyUser, userController.getCurrent)
  .patch(verifyUser, jsonBodyRequired, userController.updateCurrent)
  .all(onlySupportedMethods('GET', 'PATCH'));

router.route('/:username')
  .get(verifyUser, userController.getByUsername)
  .all(onlySupportedMethods('GET'));

export default router;
