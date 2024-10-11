import Router from 'express';
import {
  getAllSharedPlaylist,
  sharePlaylist,
  unsharePlaylistWithUser,
} from '../controllers/shared_playlist.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();
router.route('/').get(verifyToken, getAllSharedPlaylist);
router.route('/:playlistId').post(verifyToken, sharePlaylist);
router.route('/:playlistId').delete(verifyToken, unsharePlaylistWithUser);

export default router;
