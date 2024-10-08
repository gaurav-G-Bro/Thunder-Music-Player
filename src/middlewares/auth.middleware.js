import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  try {
    const incomingToken =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '');

    if (!incomingToken) throw new ApiError(401, 'user not logged in');

    const decodeToken = await jwt.verify(
      incomingToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    if (!decodeToken) throw new ApiError(404, 'token used or expired');

    const user = await User.findById(decodeToken._id);
    if (!user) throw new ApiError(401, 'Unauthorized request');
    req.user = user;
    await user.save({ validateBeforeSave: false });
    next();
  } catch (error) {
    next();
  }
};

export { verifyToken };
