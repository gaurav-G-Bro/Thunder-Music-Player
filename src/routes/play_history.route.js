import Router from 'express';
import {
  getPlayHistory,
  createPlayHistory,
  deleteFromPlayhistory,
} from '../controllers/play_history.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();
router.route('/').get(verifyToken, getPlayHistory);
router.route('/:songId').post(verifyToken, createPlayHistory);
router.route('/:songId').delete(verifyToken, deleteFromPlayhistory);

export default router;
