import mongoose from 'mongoose';

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    artist: {
      type: String,
      required: true,
    },
    album: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Song = mongoose.model('Song', songSchema);
export { Song };
