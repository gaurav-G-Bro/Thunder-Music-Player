import { SharedPlaylist } from '../models/shared_playlist.model.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import mongoose from 'mongoose';

const getAllSharedPlaylist = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  try {
    if (!userId) throw new ApiError(401, 'user not logged in');

    const existingSharedPlaylist = await SharedPlaylist.find({
      shared_with_user_id: new mongoose.Types.ObjectId(userId),
    });

    if (!existingSharedPlaylist)
      throw new ApiError(
        500,
        'something went wrong while fetching the shared playlists'
      );

    const status =
      existingSharedPlaylist.length !== 0
        ? 'shared playlist fetched successfully'
        : 'No shared playlist found';

    return res
      .status(200)
      .json(new ApiResponse(200, status, existingSharedPlaylist));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const sharePlaylist = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { playlistId } = req.params;
  try {
    if (!userId) throw new ApiError(401, 'user not logged in');
    if (!playlistId) throw new ApiError(400, 'playlist id is required');

    const existingSharedPlaylist = await SharedPlaylist.findOne({
      shared_with_user_id: new mongoose.Types.ObjectId(userId),
      playlist_id: new mongoose.Types.ObjectId(playlistId),
    });

    if (existingSharedPlaylist)
      throw new ApiError(400, 'playlist already shared with this user');

    const sharedPlaylist = await SharedPlaylist.create({
      shared_with_user_id: new mongoose.Types.ObjectId(userId),
      playlist_id: new mongoose.Types.ObjectId(playlistId),
    });

    if (!sharedPlaylist)
      throw new ApiError(
        500,
        'something went wrong while sharing the playlist'
      );
    return res
      .status(200)
      .json(
        new ApiResponse(200, 'playlist shared successfully', sharedPlaylist)
      );
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const unsharePlaylistWithUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { playlistId } = req.params;
  try {
    if (!userId) throw new ApiError(401, 'user not logged in');
    if (!playlistId) throw new ApiError(400, 'playlist id is required');

    const sharedPlaylist = await SharedPlaylist.findOne({
      playlist_id: playlistId,
      shared_with_user_id: userId,
    });

    if (!sharedPlaylist) throw new ApiError(404, 'No shared playlist found');

    const playlist = await SharedPlaylist.findOneAndDelete({
      playlist_id: playlistId,
      shared_with_user_id: userId,
    });

    if (!playlist)
      throw new ApiError(
        500,
        'something went wrong while deleting the shared playlist'
      );

    return res
      .status(200)
      .json(new ApiResponse(200, 'shared playlist deleted successfully'));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

export { getAllSharedPlaylist, sharePlaylist, unsharePlaylistWithUser };
