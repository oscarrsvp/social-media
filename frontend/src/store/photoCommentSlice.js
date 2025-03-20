import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

// Fetch photo via Id along with user comments
export const fetchPhotoData = createAsyncThunk('users/singlePhoto', async (photoId) => {
  try {
    const response = await csrfFetch(`/api/photos/images/${photoId}`);
    const data = await response.json();

    return { data: data, photoId };
  } catch (error) {
    return { message: error };
  }
});

const initialState = { photoComments: null };

export const photoCommentSlice = createSlice({
  name: 'photoComments',
  initialState,
  reducers: {
    clearUsers: () => initialState,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPhotoData.fulfilled, (state, action) => {
      const { photoId, data } = action.payload;

      if (!data.photoData.length) return { ...state, [photoId]: {} };

      const photoData = {};

      data.photoData.forEach((user) => {
        if (!photoData[photoId]) {
          photoData[photoId] = {};
        }
        photoData[photoId][user.userId] = user;
      });

      return { ...state, ...photoData };
    });
  },
});

export default photoCommentSlice.reducer;
