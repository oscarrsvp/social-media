import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

export const searchUsers = createAsyncThunk('users/search', async (searchValue) => {
  try {
    const response = await csrfFetch(`/api/users/search?name=${searchValue}`);
    const data = await response.json();

    if (response.ok) {
      return data;
    }
  } catch (err) {
    console.error('Network error:', err);
  }
});

const initialState = { search: null };

export const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    clearUsers: () => initialState,
  },

  extraReducers: (builder) => {
    builder.addCase(searchUsers.fulfilled, (state, action) => {
      const search = {};

      action.payload.forEach((user) => {
        search[user.id] = user;
      });
      return search;
    });
  },
});

export default searchBarSlice.reducer;
