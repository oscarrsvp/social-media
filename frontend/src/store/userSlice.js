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

// Get User details
export const fetchUser = createAsyncThunk('users/singleUser', async (userId) => {
  try {
    const response = await csrfFetch(`/api/users/${userId}`);
    const data = await response.json();

    return data.User;
  } catch (error) {
    return { message: error };
  }
});

// Get current user details
export const fetchCurrentUser = createAsyncThunk('users/currentUser', async () => {
  try {
    const response = await csrfFetch('/api/users/current');
    const data = await response.json();

    return data;
  } catch (error) {
    return { message: error };
  }
});

// Post new photo / Allows user to upload a new profile image
export const uploadPhotoToCloudinary = createAsyncThunk(
  'users/uploadPhoto',
  async (photo) => {
    try {
      const { userId, url, preview } = photo;
      const formData = new FormData();

      formData.append('profileImg', url);
      formData.append('preview', preview);

      const response = await csrfFetch(`/api/photos/${userId}/profileImg`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();

      return data;
    } catch (error) {
      return { message: error };
    }
  },
);

// Update User Profile Image
export const updateProfileImg = createAsyncThunk(
  'users/updateProfileImg',
  async (photo) => {
    try {
      const { id, userId } = photo;

      const response = await csrfFetch(`/api/photos/${userId}/profileImg`, {
        method: 'PUT',
        body: JSON.stringify({
          id,
          userId,
          preview: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      return data;
    } catch (error) {
      return { message: error };
    }
  },
);

// Update User details
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (user, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append('firstName', user.firstName);
      formData.append('lastName', user.lastName);
      formData.append('gender', user.gender);
      formData.append('headerImg', user.headerImage);
      formData.append('relationship', user.relationship);

      if (user.city !== null) formData.append('city', user.city);

      if (user.middleName !== null) formData.append('middleName', user.middleName);

      if (user.bio !== null) formData.append('bio', user.bio);

      const response = await csrfFetch(`/api/users`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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

// Displays all non-following users posts
export const fetchExploreUsers = createAsyncThunk('users/explorePage', async () => {
  try {
    const response = await csrfFetch('/api/users/explore');
    const data = await response.json();

    return data.User;
  } catch (error) {
    return { message: error };
  }
});

// Reducer
const initialState = { users: null };

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsers: () => initialState,
  },

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

    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      return { ...state, [action.payload.id]: action.payload };
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      return { ...state, [action.payload.id]: action.payload };
    });

    builder.addCase(fetchExploreUsers.fulfilled, (state, action) => {
      const users = {};
      action.payload.forEach((user) => {
        users[user.id] = user;
      });
      return users;
    });

    builder.addCase(uploadPhotoToCloudinary.fulfilled, (state, action) => {
      const { userId, url, preview } = action.payload;

      if (!preview) return state;

      if (state[userId]) {
        return {
          ...state,
          [userId]: {
            ...state[userId],
            profileImage: url,
          },
        };
      }

      return state;
    });

    builder.addCase(updateProfileImg.fulfilled, (state, action) => {
      const { userId, url, preview } = action.payload;

      if (preview) {
        state[userId].profileImage = url;
      }

      return state;
    });
  },
});

export const { clearUsers } = userSlice.actions;

export default userSlice.reducer;
