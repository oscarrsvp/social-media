import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice';
import postReducer from './postSlice';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    posts: postReducer,
  },
});

export default store;
