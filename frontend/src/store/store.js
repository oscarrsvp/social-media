import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice';
import postReducer from './postSlice';
import userReducer from './userSlice';
import commentReducer from './commentSlice';
import followReducer from './followSlice';
import userPhotos from './userPhotosSlice';
import searchBar from './searchBarSlice';
import photoCommentReducer from './photoCommentSlice';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    users: userReducer,
    posts: postReducer,
    comments: commentReducer,
    following: followReducer,
    userPhotos: userPhotos,
    searchResults: searchBar,
    photoComments: photoCommentReducer,
  },
});

export default store;
