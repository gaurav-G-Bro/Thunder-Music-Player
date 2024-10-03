import mongoose from 'mongoose';

const sharedPlaylistSchema = new mongoose.Schema(
  {
    playlist_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Playlist',
    },
    shared_with_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const SharedPlaylist = mongoose.model('SharedPlaylist', sharedPlaylistSchema);
export { SharedPlaylist };
