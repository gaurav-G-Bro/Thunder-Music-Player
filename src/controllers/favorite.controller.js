import { Favorite } from '../models/favorite.model.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const getAllFavoriteSongs = asyncHandler(async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});
const addSongToFavorite = asyncHandler(async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});
const deleteSongFromFavorite = asyncHandler(async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});
export { getAllFavoriteSongs, addSongToFavorite, deleteSongFromFavorite };
