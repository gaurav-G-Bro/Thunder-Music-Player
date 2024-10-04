import Router from 'express';
import {
  getAllFavoriteSongs,
  addSongToFavorite,
  deleteSongFromFavorite,
} from '../controllers/favorite.controller.js';

const router = Router();
router.route('/').get(getAllFavoriteSongs);
router.route('/').post(addSongToFavorite);
router.route('/:id').delete(deleteSongFromFavorite);

export default router;
