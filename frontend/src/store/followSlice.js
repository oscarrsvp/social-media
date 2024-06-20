import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

// Thunk functions
export const fetchFollowing = createAsyncThunk('users/following', async () => {
  try {
    const response = await csrfFetch(`/api/users/following`);
    const data = await response.json();

    return data;
  } catch (error) {
    return { message: error };
  }
});

export const followUser = createAsyncThunk('users/follow', async (userId) => {
  try {
    const response = await csrfFetch(`/api/users/${userId}/follow`, {
      method: 'POST',
      body: JSON.stringify({
        userId,
      }),
    });
    const data = response.json();

    return data;
  } catch (err) {
    return { message: err };
  }
});

export const unfollowUser = createAsyncThunk('users/unfollow', async (userId) => {
  try {
    const response = await csrfFetch(`/api/users/${userId}/follow`, {
      method: 'DELETE',
      body: JSON.stringify({
        userId,
      }),
    });
    response.json();

    return { userId };
  } catch (err) {
    return { message: err };
  }
});

const initialState = { followingList: null };

// Slice & Reducers
const followingSlice = createSlice({
  name: 'following',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchFollowing.fulfilled, (state, action) => {
      const followingList = {};
      action.payload.forEach((user) => {
        followingList[user.followerId] = user.Followers;
      });
      return followingList;
    });

    builder.addCase(followUser.fulfilled, (state, action) => {
      state[action.payload.id] = action.payload;
    });

    builder.addCase(unfollowUser.fulfilled, (state, action) => {
      const unfollowUser = { ...state };
      delete unfollowUser[action.payload.userId];

      return unfollowUser;
    });
  },
});

export default followingSlice.reducer;
