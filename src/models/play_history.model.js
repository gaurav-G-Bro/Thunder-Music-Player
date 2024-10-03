import mongoose from 'mongoose';

const play_historySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    song_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song',
    },
    played_at: {
      type: Date,
    },
  },
  { timestamps: true }
);

const PlayHistory = mongoose.model('PlayHistory', play_historySchema);
export { PlayHistory };
