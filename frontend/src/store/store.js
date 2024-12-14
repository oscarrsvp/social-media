import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice';
import postReducer from './postSlice';
import userReducer from './userSlice';
import commentReducer from './commentSlice';
import followReducer from './followSlice';
import userPhotos from './userPhotosSlice';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    users: userReducer,
    posts: postReducer,
    comments: commentReducer,
    following: followReducer,
    userPhotos: userPhotos,
  },
});

export default store;
