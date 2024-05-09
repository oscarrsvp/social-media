import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice';
import postReducer from './postSlice';
import userReducer from './userSlice';
import commentReducer from './commentSlice';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    users: userReducer,
    posts: postReducer,
    comments: commentReducer,
  },
});

export default store;
