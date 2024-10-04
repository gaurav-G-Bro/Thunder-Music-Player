import Router from 'express';
import {
  getAllSharedPlaylist,
  sharePlaylist,
  unsharePlaylistWithUser,
} from '../controllers/shared_playlist.controller.js';

const router = Router();
router.route('/').get(getAllSharedPlaylist);
router.route('/').post(sharePlaylist);
router.route('/:id').delete(unsharePlaylistWithUser);

export default router;
