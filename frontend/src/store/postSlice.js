import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

// Thunk functions
export const fetchPosts = createAsyncThunk('post/allPosts', async () => {
  try {
    const response = await csrfFetch('/api/posts');
    const data = await response.json();

    return data;
  } catch (error) {
    return { error: error };
  }
});

export const fetchUserPosts = createAsyncThunk('post/userPosts', async (id) => {
  try {
    const response = await csrfFetch(`/api/posts/user/${id}`);
    const data = await response.json();

    return data;
  } catch (error) {
    return { error: error };
  }
});

export const createPost = createAsyncThunk('post/newPost', async (post) => {
  const { photo, context } = post;
  try {
    const response = await csrfFetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        photo,
        context,
      }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    return { error: error };
  }
});

export const getPost = createAsyncThunk('post/getPost', async (id) => {
  try {
    const response = await csrfFetch(`/api/posts/${id}`);
    const data = await response.json();

    return data;
  } catch (error) {
    return { error: error };
  }
});

export const updatePost = createAsyncThunk('post/updatePost', async (post) => {
  const { id, photo, context } = post;
  try {
    const response = await csrfFetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        photo,
        context,
      }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    return { error: error };
  }
});

export const deletePost = createAsyncThunk('post/deletePost', async (id) => {
  try {
    const response = await csrfFetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    await response.json();

    return id;
  } catch (error) {
    return { error: error };
  }
});

const initialState = { post: null };

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearPosts: () => initialState,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      const posts = {};
      action.payload.forEach((post) => {
        posts[post.id] = post;
      });
      return posts;
    });

    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      const posts = {};
      action.payload.forEach((post) => {
        posts[post.id] = post;
      });
      return posts;
    });

    builder.addCase(createPost.fulfilled, (state, action) => {
      return { ...state, [action.payload.id]: action.payload };
    });

    builder.addCase(getPost.fulfilled, (state, action) => {
      return { ...state, [action.payload.id]: action.payload };
    });

    builder.addCase(updatePost.fulfilled, (state, action) => {
      return { ...state, [action.payload.id]: action.payload };
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      const posts = { ...state };
      delete posts[action.payload];
      return posts;
    });
  },
});

export const { clearPosts } = postSlice.actions;

export default postSlice.reducer;
