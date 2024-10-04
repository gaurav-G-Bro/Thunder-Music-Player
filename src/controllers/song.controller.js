import { Song } from '../models/song.model.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const addNewSong = asyncHandler(async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});
const getSongs = asyncHandler(async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});
const getSongById = asyncHandler(async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});
const deleteSong = asyncHandler(async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

export { addNewSong, getSongs, getSongById, deleteSong };
