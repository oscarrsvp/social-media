import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

// Thunk functions
export const login = createAsyncThunk(
  'session/setUser',
  async (user, { rejectWithValue }) => {
    try {
      const { email, password } = user;
      const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();

      return data.user;
    } catch (err) {
      if (!err.ok) {
        const errors = await err.json();
        return rejectWithValue(errors.errors);
      }
    }
  },
);

export const restoreUser = createAsyncThunk('session/setUser', async () => {
  const response = await csrfFetch('/api/session');

  const data = await response.json();
  return data.user;
});

export const signup = createAsyncThunk(
  'session/setUser',
  async (user, { rejectWithValue }) => {
    try {
      const { firstName, lastName, email, password } = user;

      const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      return data.user;
    } catch (err) {
      if (!err.ok) {
        const errors = await err.json();
        return rejectWithValue(errors.errors);
      }
    }
  },
);

export const removeUser = createAsyncThunk('session/removeUser', async () => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });

  const data = await response.json();
  return data.user;
});

const initialState = { user: null, error: null };

// Slice & Reducers
export const sessionSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfileImage(state, action) {
      if (state.user) {
        state.user.profileImage = action.payload;
      }
    },

    updateFullName(state, action) {
      if (state.user) {
        state.user.firstName = action.payload.firstName;
        state.user.lastName = action.payload.lastName;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      return { ...state, user: action.payload, error: null };
    });
    builder.addCase(login.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      }
    });
    builder.addCase(removeUser.fulfilled, (state) => {
      return { ...state, user: null };
    });
  },
});

export const { updateProfileImage, updateFullName } = sessionSlice.actions;
export default sessionSlice.reducer;
