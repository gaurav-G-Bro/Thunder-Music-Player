import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { ApiError } from '../utils/ApiError.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const uploadOnCloudinary = async (localPath) => {
  try {
    if (!localPath || localPath?.trim() === '')
      throw new ApiError(400, 'local path is required');

    const uploadStatus = await cloudinary.uploader.upload(localPath, {
      resource_type: 'auto',
    });
    if (!uploadStatus) throw new ApiError(500, 'failed to upload audio file');
    await fs.unlinkSync(localPath);

    return uploadStatus;
  } catch (error) {
    await fs.unlinkSync(localPath);
    throw new ApiError(
      500,
      'something went wrong while uploading the audio file',
      error
    );
  }
};

export { uploadOnCloudinary };
