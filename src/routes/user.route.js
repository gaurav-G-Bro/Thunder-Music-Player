import Router from 'express';
import {
  register,
  login,
  logout,
  refresh_token,
  udpateProfile,
  userDetails,
  userDetailsById,
} from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
const router = Router();

router.route('/auth/register').post(register);
router.route('/auth/login').post(login);
router.route('/auth/logout').post(verifyToken, logout);
router.route('/auth/refresh-token').post(verifyToken, refresh_token);
router.route('/update-profile').patch(verifyToken, udpateProfile);
router.route('/').get(verifyToken, userDetails);
router.route('/:id').get(verifyToken, userDetailsById);

export default router;
