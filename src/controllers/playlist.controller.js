import { Playlist } from '../models/playlist.model.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const getAllPlaylist = asyncHandler(async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});
const getPlaylistById = asyncHandler(async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});
const createPlaylist = asyncHandler(async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const updatePlaylist = asyncHandler(async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});
const deletePlaylist = asyncHandler(async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});
const addSongsToPlaylist = asyncHandler(async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const delSongsFromPlaylist = asyncHandler(async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

export {
  getAllPlaylist,
  getPlaylistById,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSongsToPlaylist,
  delSongsFromPlaylist,
};
