import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    song_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song',
    },
  },
  { timestamps: true }
);

const Favorite = mongoose.model('Favorite', favoriteSchema);
export { Favorite };
