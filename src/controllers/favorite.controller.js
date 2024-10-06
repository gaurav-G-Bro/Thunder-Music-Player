import { Favorite } from '../models/favorite.model.js';
import { Song } from '../models/song.model.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import mongoose from 'mongoose';

const getAllFavoriteSongs = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  try {
    if (!userId) throw new ApiError(400, 'user not logged in');

    const favSongs = await Favorite.find({
      user_id: userId,
    });

    if (!favSongs) throw new ApiError(404, 'No song found');
    const favSongStatus =
      !favSongs.length < 0
        ? 'favorite songs fetched successfully'
        : 'No songs available';
    return res.status(200).json(new ApiResponse(200, favSongStatus, favSongs));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const addSongToFavorite = asyncHandler(async (req, res) => {
  const song_id = req.params;
  try {
    const userId = req.user._id;
    if (!userId) throw new ApiError(400, 'user not logged in');

    const existSongInFav = await Favorite.findOne({
      user_id: userId,
      song_id: new mongoose.Types.ObjectId(song_id),
    });
    if (existSongInFav)
      throw new ApiError(200, 'song is already added in favorite');
    const songId = new mongoose.Types.ObjectId(song_id);
    const songExisted = await Song.findById(songId);
    if (!songExisted) throw new ApiError(400, 'song does not exist or removed');

    const addSongToFav = await Favorite.create({
      user_id: userId,
      song_id: new mongoose.Types.ObjectId(song_id),
    });

    if (!addSongToFav)
      throw new ApiError(500, 'failed to add song to favorite');

    return res
      .status(200)
      .json(new ApiResponse(200, 'added to favorite', addSongToFav));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const deleteSongFromFavorite = asyncHandler(async (req, res) => {
  try {
    return res
      .status(200)
      .json(new ApiResponse(200, 'song deleted from favorite'));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});
export { getAllFavoriteSongs, addSongToFavorite, deleteSongFromFavorite };
