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
router.route('/:id').get(getSongById);
router.route('/:id').delete(deleteSong);

export default router;
