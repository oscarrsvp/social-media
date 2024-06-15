import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

// Thunk Functions
export const fetchUsers = createAsyncThunk('users/allUsers', async () => {
  try {
    const response = await csrfFetch('/api/users');
    const data = await response.json();

    return data.User;
  } catch (error) {
    return { message: error };
  }
});

export const fetchUser = createAsyncThunk('users/singleUser', async (userId) => {
  try {
    const response = await csrfFetch(`/api/users/${userId}`);
    const data = await response.json();

    return data.User;
  } catch (error) {
    return { message: error };
  }
});

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await csrfFetch(`/api/users/`, {
        method: 'PUT',
        body: JSON.stringify(user),
      });

      const data = await response.json();

      return data;
    } catch (err) {
      if (!err.ok) {
        const errors = await err.json();
        return rejectWithValue(errors.errors);
      }
    }
  },
);

// Reducer
const initialState = { users: null };

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const users = {};
      action.payload.forEach((user) => {
        users[user.id] = user;
      });
      return users;
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      return { ...state, [action.payload.id]: action.payload };
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      return { ...state, [action.payload.id]: action.payload };
    });
  },
});

export default userSlice.reducer;
