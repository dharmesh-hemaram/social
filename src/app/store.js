import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import albumsReducer from '../features/albums/albumsSlice'
import usersReducer from '../features/users/usersSlice'
import commentsReducer from '../features/comments/commentsSlice'
import photosReducer from '../features/photos/photosSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    albums: albumsReducer,
    users: usersReducer,
    comments: commentsReducer,
    photos: photosReducer,
  },
});
