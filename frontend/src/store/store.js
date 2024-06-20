import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice';
import postReducer from './postSlice';
import userReducer from './userSlice';
import commentReducer from './commentSlice';
import followReducer from './followSlice';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    users: userReducer,
    posts: postReducer,
    comments: commentReducer,
    following: followReducer,
  },
});

export default store;
