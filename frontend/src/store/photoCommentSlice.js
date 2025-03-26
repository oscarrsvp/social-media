import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

// Fetch photo via Id along with user comments
export const fetchPhotoData = createAsyncThunk('users/singlePhoto', async (photoId) => {
  try {
    const response = await csrfFetch(`/api/photos/${photoId}/comments`);
    const data = await response.json();

    return { data: data, photoId };
  } catch (error) {
    return { message: error };
  }
});

export const newPhotoComment = createAsyncThunk(
  'images/picture',
  async (data, { rejectWithValue }) => {
    try {
      const { photoId } = data;
      const response = await csrfFetch(`/api/photos/images/${photoId}`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const photoComment = await response.json();

      return { data: photoComment, photoId };
    } catch (error) {
      if (!error.ok) {
        const errors = await error.json();
        return rejectWithValue(errors.errors);
      }
    }
  },
);

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

      if (!data.length) return { ...state, [photoId]: {} };

      const photoData = {};

      data.forEach((user) => {
        if (!photoData[photoId]) {
          photoData[photoId] = {};
        }
        photoData[photoId][user.id] = user;
      });

      return { ...state, ...photoData };
    });

    builder.addCase(newPhotoComment.fulfilled, (state, action) => {
      const { photoId, data } = action.payload;
      const { commentId } = data;

      if (!state[photoId]) {
        state[photoId] = {};
      }

      state[photoId][commentId] = data;
    });
  },
});

export default photoCommentSlice.reducer;
