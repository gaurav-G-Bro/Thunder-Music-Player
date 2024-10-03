import Router from 'express';
import {
  register,
  login,
  logout,
  udpateProfile,
  userDetails,
  userDetailsById,
} from '../controllers/user.controller.js';

const router = Router();

router.route('/auth/register').post(register);
router.route('/auth/login').post(login);
router.route('/auth/logout').post(logout);
router.route('/update-profile').patch(udpateProfile);
router.route('/').get(userDetails);
router.router('/:id').get(userDetailsById);

export default router;
