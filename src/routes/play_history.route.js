import Router from 'express';
import {
  getPlayHistory,
  createPlayHistory,
} from '../controllers/play_history.controller.js';

const router = Router();
router.route('/').get(getPlayHistory);
router.route('/').post(createPlayHistory);

export default router;
