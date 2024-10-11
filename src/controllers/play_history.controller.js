import { PlayHistory } from '../models/play_history.model.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const getPlayHistory = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  try {
    if (!userId) throw new ApiError(400, 'user not logged in');

    const existingSongsInPlayHistory = await PlayHistory.find({
      user_id: userId,
    });

    if (!existingSongsInPlayHistory)
      throw new ApiError(
        500,
        'something went wrong while fetching the play history'
      );
    const status =
      existingSongsInPlayHistory.length !== 0
        ? 'Songs fetched successfully'
        : 'No song available in history';
    return res
      .status(200)
      .json(new ApiResponse(200, status, existingSongsInPlayHistory));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const createPlayHistory = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  console.log(userId);
  const songId = req.params?.songId;
  try {
    if (!userId) throw new ApiError(400, 'user not logged in');

    const existingSongInPlayHistory = await PlayHistory.findOne({
      user_id: userId,
      song_id: songId,
    });

    if (existingSongInPlayHistory)
      throw new ApiError(400, 'song is already in play history');

    const playHistory = await PlayHistory.create({
      user_id: userId,
      song_id: songId,
    });

    if (!playHistory)
      throw new ApiError(
        500,
        'something went wrong while adding in play history'
      );

    return res
      .status(200)
      .json(new ApiResponse(200, 'song added to play history successfully'));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const deleteFromPlayhistory = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const songId = req.params?.songId;
  try {
    if (!userId) throw new ApiError(400, 'user not logged in');

    const existingSongsInPlayHistory = await PlayHistory.findOne({
      user_id: userId,
      song_id: songId,
    });

    if (!existingSongsInPlayHistory)
      throw new ApiError(400, 'song does not exist or removed from history');

    const status = await PlayHistory.findOneAndDelete({
      user_id: userId,
      song_id: songId,
    });

    if (!status)
      throw new ApiError(
        500,
        'something went wrong while deleting the song from history'
      );

    return res
      .status(200)
      .json(new ApiResponse(200, 'song deleted from history'));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

export { getPlayHistory, createPlayHistory, deleteFromPlayhistory };
