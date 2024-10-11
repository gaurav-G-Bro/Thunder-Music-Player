import { Playlist } from '../models/playlist.model.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import mongoose from 'mongoose';

const getAllPlaylist = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  try {
    if (!userId) throw new ApiError(401, 'user not logged in');

    const existingPlaylist = await Playlist.find({
      user_id: new mongoose.Types.ObjectId(userId),
    });

    if (!existingPlaylist)
      throw new ApiError(
        500,
        "something went wrong while fetching the user's playlist"
      );
    const status =
      existingPlaylist.length !== 0
        ? 'Playlist fetched successfully'
        : 'No playlist found';

    return res.status(200).json(new ApiResponse(200, status, existingPlaylist));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const userId = req.user?._id;
  try {
    if (!userId) throw new ApiError(401, 'user not logged in');
    if (!playlistId || playlistId.trim() === '')
      throw new ApiError(400, 'playlist Id is required');

    const existingPlaylist = await Playlist.findById({
      user_id: userId,
      _id: new mongoose.Types.ObjectId(playlistId),
    });

    if (!existingPlaylist)
      throw new ApiError(404, 'playlist does not exists or removed already');

    return res
      .status(200)
      .json(
        new ApiResponse(200, 'playlist fetched successfully', existingPlaylist)
      );
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user?._id;
  try {
    if (!name || name.trim() === '')
      throw new ApiError(400, 'name is required');
    if (!description || description.trim() === '')
      throw new ApiError(400, 'description is required');
    if (!userId) throw new ApiError(401, 'user not logged in');

    const existingPlaylist = await Playlist.findOne({
      user_id: userId,
      name,
    });

    if (existingPlaylist)
      throw new ApiError(400, 'name of this playlist is already taken');

    const playlist = await Playlist.create({
      user_id: userId,
      name,
      description,
    });

    if (!playlist)
      throw new ApiError(
        500,
        'something went wrong while creating the playlist'
      );
    return res
      .status(200)
      .json(new ApiResponse(200, 'playlist created successfully', playlist));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const userId = req.user?._id;
  const { name, description } = req.body;
  try {
    if (!userId) throw new ApiError(401, 'user not logged in');
    if (!playlistId) throw new ApiError(400, 'playlist id is required');
    if (!name || name.trim() === '')
      throw new ApiError(400, 'name is required');
    if (!description || description.trim() === '')
      throw new ApiError(400, 'description is required');

    const existingPlaylist = await Playlist.findOne({
      user_id: userId,
      _id: new mongoose.Types.ObjectId(playlistId),
    });

    if (!existingPlaylist) throw new ApiError(404, 'playlist not found');
    if (existingPlaylist.name === name)
      throw new ApiError(400, 'Name is already taken');

    const updatePlaylist = await Playlist.findByIdAndUpdate(
      playlistId,
      {
        $set: {
          name,
          description,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json(
        new ApiResponse(200, 'playlist updated successfully', updatePlaylist)
      );
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const userId = req.user?._id;
  try {
    if (!userId) throw new ApiError(401, 'user not logged in');
    if (!playlistId) throw new ApiError(400, 'playlist id is required');

    const existingPlaylist = await Playlist.findById({
      user_id: userId,
      _id: new mongoose.Types.ObjectId(playlistId),
    });

    if (!existingPlaylist)
      throw new ApiError(404, 'playlist does not exists or removed already');

    const playlist = await Playlist.findByIdAndDelete({
      user_id: userId,
      _id: playlistId,
    });

    if (!playlist)
      throw new ApiError(
        500,
        'something went wrong while deleting the playlist'
      );

    return res
      .status(200)
      .json(new ApiResponse(200, 'playlist deleted successfully'));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const addSongsToPlaylist = asyncHandler(async (req, res) => {
  const { songId, playlistId } = req.params;
  const userId = req.user?._id;

  try {
    if (!userId) throw new ApiError(401, 'user not logged in');
    if (!songId) throw new ApiError(401, 'song id is required');
    if (!playlistId) throw new ApiError(400, 'playlist id is required');

    const playlist = await Playlist.findById({
      user_id: userId,
      _id: playlistId,
    });

    if (!playlist) throw new ApiError(404, 'playlist not found');

    if (playlist && playlist.songs_ids) {
      playlist.songs_ids.map((id) => {
        if (songId.toString() === id.toString())
          throw new ApiError(400, 'song is already added in this playlist');
      });
    }

    const existingPlaylist = await Playlist.findByIdAndUpdate(
      playlistId,
      {
        $push: {
          songs_ids: songId,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json(new ApiResponse(200, 'song added to playlist', existingPlaylist));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const delSongsFromPlaylist = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { playlistId, songId } = req.params;
  try {
    if (!userId) throw new ApiError(401, 'user not logged in');
    if (!playlistId) throw new ApiError(400, 'playlist id is required');
    if (!songId) throw new ApiError(400, 'song id is required');

    const playlist = await Playlist.findById({
      _id: playlistId,
      user_id: userId,
    });

    if (!playlistId)
      throw new ApiError(404, 'playlist does not exists or removed');

    const existingPlaylist = await Playlist.findByIdAndUpdate(
      playlistId,
      {
        $pull: {
          songs_ids: songId,
        },
      },
      { new: true }
    );

    if (!existingPlaylist)
      throw new ApiError(500, 'something went wrong while removing the song');

    return res
      .status(200)
      .json(new ApiResponse(200, 'song removed successfully'));
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
