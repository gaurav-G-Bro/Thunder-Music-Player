import Router from 'express';
import {
  addNewSong,
  getSongs,
  getSongById,
  deleteSong,
} from '../controllers/song.controller.js';

const router = Router();

router.route('/songs').post(addNewSong);
router.route('/').get(getSongs);
router.router('/:id').get(getSongById);
router.router('/:id').delete(deleteSong);

export default router;
