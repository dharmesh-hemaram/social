import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import albumsReducer from '../features/albums/albumsSlice'
import usersReducer from '../features/users/usersSlice'
import commentsReducer from '../features/comments/commentsSlice'
import photosReducer from '../features/photos/photosSlice';
import todosReducer from '../features/todo/todosSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    albums: albumsReducer,
    users: usersReducer,
    comments: commentsReducer,
    photos: photosReducer,
    todos: todosReducer
  },
});
