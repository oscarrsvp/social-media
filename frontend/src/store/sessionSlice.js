import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

// Thunk functions
export const login = createAsyncThunk('session/setUser', async (user) => {
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
});

export const restoreUser = createAsyncThunk('session/setUser', async () => {
  const response = await csrfFetch('/api/session');

  const data = await response.json();
  return data.user;
});

export const signup = createAsyncThunk('session/setUser', async (user) => {
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
});

export const removeUser = createAsyncThunk('session/removeUser', async () => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });

  const data = await response.json();
  return data.user;
});

const initialState = { user: null };

// Slice & Reducers
export const sessionSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      return { ...state, user: action.payload };
    });
    builder.addCase(removeUser.fulfilled, (state, _action) => {
      return { ...state, user: null };
    });
  },
  defaultValue: { user: initialState },
});

export default sessionSlice.reducer;
