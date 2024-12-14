import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

// Get all photos from user
export const fetchUsersPhotos = createAsyncThunk('users/usersPhotos', async (userId) => {
  try {
    const response = await csrfFetch(`/api/photos/${userId}/images`);
    const data = await response.json();

    return data;
  } catch (error) {
    return { message: error };
  }
});

// Delete user photos
export const deleteUserPhotos = createAsyncThunk('users/deleteUserPhoto', async (id) => {
  try {
    const response = await csrfFetch(`/api/photos/images/${id}`, {
      method: 'DELETE',
    });

    await response.json();

    return id;
  } catch (error) {
    return { message: error };
  }
});

// Reducer
const initialState = { userPhotos: null };

export const userPhotosSlice = createSlice({
  name: 'usersPhotos',
  initialState,
  reducers: {
    clearUsers: () => initialState,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUsersPhotos.fulfilled, (state, action) => {
      const userPhotos = {};

      action.payload.Photos.forEach((photo) => {
        userPhotos[photo.id] = photo;
      });
      return userPhotos;
    });

    builder.addCase(deleteUserPhotos.fulfilled, (state, action) => {
      const userPhotos = { ...state };
      delete posts[action.payload];
      return userPhotos;
    });
  },
});

export default userPhotosSlice.reducer;
