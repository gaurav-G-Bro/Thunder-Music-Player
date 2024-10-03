import { app } from './app.js';
import Router from 'express';
import { CONNECT_DB } from './db/mongo.connection.js';
const router = Router();

CONNECT_DB()
  .then(() => {
    router.listen(process.env.PORT, (err) => {
      if (err) throw err;
      console.log(`server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log('connection failed', err.message);
  });

/* imports are here */
import userRoute from './routes/user.route.js';
import songRoute from './routes/song.route.js';
import playlistRoute from './routes/playlist.route.js';
import sharedPlaylistRoute from './routes/shared_playlist.route.js';
import favoriteRoute from './routes/favorite.route.js';
import playHistoryRoute from './routes/play_history.route.js';

app.use('/api/v1/users', userRoute);
app.use('/api/v1/songs', songRoute);
app.use('/api/v1/playlists', playlistRoute);
app.use('/api/v1/shared-playlists', sharedPlaylistRoute);
app.use('/api/v1/favorites', favoriteRoute);
app.use('/api/v1/play-history', playHistoryRoute);
