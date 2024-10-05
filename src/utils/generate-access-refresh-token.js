import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';

const generate_access_refresh_token = async (userId) => {
  if (!userId) throw new ApiError(400, 'User Id is required');

  const user = await User.findById(userId);

  const accessToken = await user.generateAccessToken(userId);
  const refreshToken = await user.generateRefreshToken(userId);

  if (!accessToken || !refreshToken) throw new ApiError(400, 'Invalid user Id');
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

export { generate_access_refresh_token };
