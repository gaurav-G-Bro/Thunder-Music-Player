import { v2 as cloudinary } from 'cloudinary';
import { ApiError } from '../utils/ApiError.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const removeFromCloudinary = async (publicId) => {
  try {
    if (!publicId || publicId?.trim() === '')
      throw new ApiError(400, 'cloudinary path is required');

    const removedStatus = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'video',
    });

    if (!removedStatus)
      throw new ApiError(400, 'failed to remove the audio files');
    return removedStatus;
  } catch (error) {
    throw new ApiError(
      500,
      'something went wrong while removing the file',
      error
    );
  }
};

export { removeFromCloudinary };
