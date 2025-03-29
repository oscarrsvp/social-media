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

// Create new Comment on Photo
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

// Edit Photo Comment
export const EditPhotoComment = createAsyncThunk(
  'photoComment/updatePhotoComment',
  async (data, { rejectWithValue }) => {
    try {
      const { id } = data;
      const response = await csrfFetch(`/api/images/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      const comment = await response.json();

      return comment;
    } catch (error) {
      if (!error.ok) {
        const errors = await error.json();
        return rejectWithValue(errors.errors);
      }
    }
  },
);

// Delete Photo Comment
export const deletePhotoComment = createAsyncThunk(
  'photoComment/deletePhotoComment',
  async (data) => {
    try {
      const { id } = data;
      const response = await csrfFetch(`/api/images/${id}`, {
        method: 'DELETE',
      });
      await response.json();

      return data;
    } catch (error) {
      return { error: error };
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

    builder.addCase(EditPhotoComment.fulfilled, (state, action) => {
      const { photoId, id } = action.payload;

      if (!state[photoId]) {
        state[photoId] = {};
      }
      state[photoId][id] = action.payload;
    });

    builder.addCase(deletePhotoComment.fulfilled, (state, action) => {
      delete state[action.payload.postId][action.payload.id];
    });
  },
});

export default photoCommentSlice.reducer;
