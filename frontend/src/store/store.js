import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice';
import postReducer from './postSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    users: userReducer,
    posts: postReducer,
  },
});

export default store;
