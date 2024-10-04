import Router from 'express';
import {
  getAllPlaylist,
  getPlaylistById,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSongsToPlaylist,
  delSongsFromPlaylist,
} from '../controllers/playlist.controller.js';

const router = Router();
router.route('/').get(getAllPlaylist);
router.route('/:id').get(getPlaylistById);
router.route('/').post(createPlaylist);
router.route('/:id').patch(updatePlaylist);
router.route('/:id').delete(deletePlaylist);
router.route('/:id/songs').post(addSongsToPlaylist);
router.route('/:id/songs/:songId').delete(delSongsFromPlaylist);

export default router;
