import { Song } from '../models/song.model.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary } from '../utils/cloudinary-upload.js';
import { removeFromCloudinary } from '../utils/cloudinary-remove.js';
import mongoose from 'mongoose';

const addNewSong = asyncHandler(async (req, res) => {
  const { title, artist, album, genre } = req.body;
  try {
    if (!req.user) throw new ApiError(401, 'user not logged in');
    if (!title || title.trim() === '')
      throw new ApiError(400, 'title is required');
    if (!artist || artist.trim() === '')
      throw new ApiError(400, 'artist is required');
    if (!album || album.trim() === '')
      throw new ApiError(400, 'album is required');

    const existingSong = await Song.findOne({
      title,
      artist,
      album,
    });

    const localFilePath = req.files?.audio[0]?.path;
    if (!localFilePath) throw new ApiError(400, 'audio file is required');

    const audioFileUploadStatus = await uploadOnCloudinary(localFilePath);

    if (!audioFileUploadStatus)
      throw new ApiError(
        500,
        'something went wrong while uploading the audio file'
      );

    if (existingSong) throw new ApiError(400, 'song is already added');
    const addSong = await Song.create({
      title,
      artist,
      album,
      genre,
      duration: audioFileUploadStatus?.duration,
      url: audioFileUploadStatus?.url,
      owner: req.user._id,
    });

    const public_id_split = audioFileUploadStatus.url?.split('/');
    const public_id =
      public_id_split[public_id_split.length - 1]?.split('.')[0];

    if (!addSong) {
      await removeFromCloudinary(public_id);
      throw new ApiError(500, 'failed to add song, try again');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, 'song uploaded successfully', addSong));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const getSongs = asyncHandler(async (req, res) => {
  try {
    if (!req.user) throw new ApiError(401, 'user not logged in');

    const userSongs = await Song.find({
      owner: req.user._id,
    });

    if (!userSongs || !userSongs.length > 0)
      throw new ApiError(404, 'No song found');
    return res
      .status(200)
      .json(new ApiResponse(200, 'songs fetched successfully', userSongs));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const getSongById = asyncHandler(async (req, res) => {
  const songId = req.params;
  try {
    if (!req.user) throw new ApiError(401, 'user not logged in');
    if (!songId) throw new ApiError(401, 'Invalid song Id');

    const userSong = await Song.findOne({
      _id: new mongoose.Types.ObjectId(songId),
      owner: req.user._id,
    });

    if (!userSong) throw new ApiError(404, 'No song found');
    return res
      .status(200)
      .json(new ApiResponse(200, 'songs fetched successfully', userSong));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const deleteSong = asyncHandler(async (req, res) => {
  const songId = req.params;
  try {
    if (!req.user) throw new ApiError(401, 'user not logged in');
    if (!songId) throw new ApiError(404, 'Invalid song Id');

    const deletedSong = await Song.findOneAndDelete(
      {
        _id: new mongoose.Types.ObjectId(songId),
        owner: req.user._id,
      },
      { new: true }
    );

    if (!deletedSong)
      throw new ApiError(404, 'song does not exists or removed');

    const public_id_split = deletedSong.url?.split('/');
    const public_id =
      public_id_split[public_id_split.length - 1]?.split('.')[0];

    if (deletedSong) {
      const removedStatus = await removeFromCloudinary(public_id);
      console.log(removedStatus);
      if (!removedStatus) throw new ApiError(500, 'failed to remove the song');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, 'song deleted successfully'));
  } catch (error) {
    console.log(error);
    throw new ApiError(error.statusCode, error.message);
  }
});

export { addNewSong, getSongs, getSongById, deleteSong };
