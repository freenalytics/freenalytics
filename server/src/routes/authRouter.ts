import express from 'express';
import { localAuthenticate, verifyUser } from '../middleware/auth';
import { onlySupportedMethods } from '../middleware/routes';
import * as authController from '../controllers/authController';

const router = express.Router();

router.post('/register', authController.register);
router.all('/register', onlySupportedMethods('POST'));

router.post('/login', localAuthenticate, authController.login);
router.all('/login', onlySupportedMethods('POST'));

router.get('/registration-open', authController.registrationOpen);
router.all('/registration-open', onlySupportedMethods('GET'));

router.put('/change-password', verifyUser, authController.changePassword);
router.all('/change-password', onlySupportedMethods('PUT'));

export default router;
