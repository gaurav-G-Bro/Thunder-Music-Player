import Router from 'express';
import {
  getAllFavoriteSongs,
  addSongToFavorite,
  deleteSongFromFavorite,
} from '../controllers/favorite.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();
router.route('/').get(verifyToken, getAllFavoriteSongs);
router.route('/:songId').post(verifyToken, addSongToFavorite);
router.route('/:songId').delete(verifyToken, deleteSongFromFavorite);

export default router;
