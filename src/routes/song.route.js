import Router from 'express';
import {
  addNewSong,
  getSongs,
  getSongById,
  deleteSong,
} from '../controllers/song.controller.js';
import { upload } from '../middlewares/multer.upload.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/').post(
  verifyToken,
  upload.fields([
    {
      name: 'audio',
      maxCount: 1,
    },
  ]),
  addNewSong
);
router.route('/').get(verifyToken, getSongs);
router.route('/:id').get(verifyToken, getSongById);
router.route('/:id').delete(verifyToken, deleteSong);

export default router;
