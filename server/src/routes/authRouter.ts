import express from 'express';
import { localAuthenticate, verifyUser } from '../middleware/auth';
import { onlySupportedMethods } from '../middleware/routes';
import * as authController from '../controllers/authController';

const router = express.Router();

router.route('/register')
  .post(authController.register)
  .all(onlySupportedMethods('POST'));

router.route('/login')
  .post(localAuthenticate, authController.login)
  .all(onlySupportedMethods('POST'));

router.route('/registration-open')
  .get(authController.registrationOpen)
  .all(onlySupportedMethods('GET'));

router.route('/change-password')
  .put(verifyUser, authController.changePassword)
  .all(onlySupportedMethods('PUT'));

export default router;
