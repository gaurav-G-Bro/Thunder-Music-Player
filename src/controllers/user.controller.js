import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { OPTIONS } from '../constants/constants.js';
import { generate_access_refresh_token } from '../utils/generate-access-refresh-token.js';
import mongoose from 'mongoose';

const register = asyncHandler(async (req, res) => {
  const { username, email, password, name } = req.body;
  try {
    if (!email || email.trim() === '')
      throw new ApiError(400, 'email is required');

    if (!password || password.trim() === '')
      throw new ApiError(400, 'password is required');

    if (!name || name.trim() === '')
      throw new ApiError(400, 'name is required');

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser)
      throw new ApiError(400, 'username or email is already registered');

    const newUser = {
      username: !username || username.trim() === '' ? email : username,
      email,
      password,
      name,
    };

    const user = await User.create(newUser);

    if (!user)
      throw new ApiError(
        500,
        'something went wrong while registering the user'
      );

    const removeNewUserData = await User.findById(user._id).select('-password');
    return res.status(200).json(
      new ApiResponse(200, 'user registered successfully', {
        user: removeNewUserData,
      })
    );
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const login = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!email || email.trim() === '')
      throw new ApiError(400, 'email is required');

    if (!password || password.trim() === '')
      throw new ApiError(400, 'password is required');

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!existingUser) throw new ApiError(404, 'user not registered');
    const validPassword = await existingUser.isPasswordValid(password);

    if (!validPassword) throw new ApiError(401, 'Invalid credentials');

    const { accessToken, refreshToken } = await generate_access_refresh_token(
      existingUser._id
    );

    if (!accessToken || !refreshToken)
      throw new ApiError(
        500,
        'something went wrong while generating the tokens'
      );

    const user = await User.findById(existingUser._id).select(
      '-password -refreshToken'
    );

    return res
      .cookie('accessToken', accessToken, OPTIONS)
      .cookie('refreshToken', refreshToken, OPTIONS)
      .status(200)
      .json(
        new ApiResponse(200, 'user logged in successfully', {
          user,
          accessToken,
          refreshToken,
        })
      );
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const logout = asyncHandler(async (req, res) => {
  const user = req.user;
  try {
    if (!user) throw new ApiError(401, 'user not logged in');

    const existedUser = await User.findByIdAndUpdate(user._id, {
      $unset: {
        refreshToken: 1,
      },
    });
    if (!existedUser) throw new ApiError(401, 'unauthorized request');

    return res
      .status(200)
      .clearCookie('accessToken', OPTIONS)
      .clearCookie('refreshToken', OPTIONS)
      .json(new ApiResponse(200, 'user logged out successfully'));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const refresh_token = asyncHandler(async (req, res) => {
  try {
    if (!req.user || req.user.length < 0)
      throw new ApiError(401, 'user not logged in');

    const { accessToken, refreshToken } = await generate_access_refresh_token(
      req.user._id
    );

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken,
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .cookie('accessToken', accessToken, OPTIONS)
      .cookie('refreshToken', refreshToken, OPTIONS)
      .json(new ApiResponse(200, 'refreshToken refreshed successfully'));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const udpateProfile = asyncHandler(async (req, res) => {
  const { name, email, username } = req.body;
  try {
    if (!req.user || req.user.length < 0)
      throw new ApiError(401, 'user not logged in');

    if (!name || name.trim() === '')
      throw new ApiError(400, 'name is required');

    if (!email || email.trim() === '')
      throw new ApiError(400, 'email is required');

    if (username?.trim() === '')
      throw new ApiError(400, 'username is required');

    const user = await User.findByIdAndUpdate(req.user._id, {
      $set: {
        name,
        email,
        username,
      },
    });

    if (!user)
      throw new ApiError(500, 'something went wrong while updating the user');

    const someDetailsRemovedFromUser = await User.findById(user._id).select(
      '-password -refreshToken'
    );

    return res.status(200).json(
      new ApiResponse(200, 'profile updated successfully', {
        user: someDetailsRemovedFromUser,
      })
    );
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const userDetails = asyncHandler(async (req, res) => {
  try {
    if (!req.user || req.user.length < 0)
      throw new ApiError(401, 'user not logged in');

    const users = await User.find({}).select('-password -refreshToken');

    if (!users) throw new ApiError(404, 'users not found');
    return res
      .status(200)
      .json(new ApiResponse(200, 'users fetched successfully', users));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const userDetailsById = asyncHandler(async (req, res) => {
  let userId = req.params;
  try {
    if (!userId) throw new ApiError(401, 'user not logged in');
    userId = new mongoose.Types.ObjectId(userId);

    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, 'user not found');
    return res
      .status(200)
      .json(new ApiResponse(200, 'user fetched successfully', user));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

export {
  register,
  login,
  logout,
  refresh_token,
  udpateProfile,
  userDetails,
  userDetailsById,
};
