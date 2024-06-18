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

export const createPost = createAsyncThunk(
  'post/newPost',
  async (post, { rejectWithValue }) => {
    try {
      const { photo, context } = post;
      const response = await csrfFetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
          photo,
          context,
        }),
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

export const getPost = createAsyncThunk('post/getPost', async (id) => {
  try {
    const response = await csrfFetch(`/api/posts/${id}`);
    const data = await response.json();

    return data;
  } catch (error) {
    return { error: error };
  }
});

export const updatePost = createAsyncThunk(
  'post/updatePost',
  async (post, { rejectWithValue }) => {
    try {
      const { id, photo, context } = post;
      const response = await csrfFetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          photo,
          context,
        }),
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

export const likePost = createAsyncThunk('post/likePost', async (postId) => {
  try {
    const response = await csrfFetch(`/api/posts/${postId}/likes`, {
      method: 'POST',
      body: JSON.stringify({
        liked: true,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { error };
  }
});

export const dislikePost = createAsyncThunk('post/dislikePost', async (post) => {
  try {
    const { postId } = post;
    const response = await csrfFetch(`/api/posts/${postId}/likes`, {
      method: 'DELETE',
    });
    await response.json();

    return post;
  } catch (error) {
    return { error };
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
      const posts = { ...state };
      delete posts.error;
      return { ...posts, [action.payload.id]: action.payload };
    });

    builder.addCase(createPost.rejected, (state, action) => {
      if (action.payload) {
        const err = action.payload.context;
        state.error = err;
      }
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

    builder.addCase(likePost.fulfilled, (state, action) => {
      const { userId, postId } = action.payload;
      state[postId].likes[userId] = true;
    });

    builder.addCase(dislikePost.fulfilled, (state, action) => {
      const { postId, userId } = action.payload;
      const posts = { ...state };
      delete posts[postId].likes[userId];
    });
  },
});

export const { clearPosts } = postSlice.actions;

export default postSlice.reducer;
