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
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();
router.route('/').get(verifyToken, getAllPlaylist);
router.route('/:playlistId').get(verifyToken, getPlaylistById);
router.route('/').post(verifyToken, createPlaylist);
router.route('/:playlistId').patch(verifyToken, updatePlaylist);
router.route('/:playlistId').delete(verifyToken, deletePlaylist);
router.route('/:playlistId/add/:songId').patch(verifyToken, addSongsToPlaylist);
router
  .route('/:playlistId/remove/:songId')
  .patch(verifyToken, delSongsFromPlaylist);

export default router;
