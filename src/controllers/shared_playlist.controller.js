import { SharedPlaylist } from '../models/shared_playlist.model.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const getAllSharedPlaylist = asyncHandler(async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});
const sharePlaylist = asyncHandler(async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});
const unsharePlaylistWithUser = asyncHandler(async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

export { getAllSharedPlaylist, sharePlaylist, unsharePlaylistWithUser };
