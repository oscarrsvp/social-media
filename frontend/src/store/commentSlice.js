import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

// Thunk functions
export const fetchComments = createAsyncThunk('comment/postComments', async (id) => {
  try {
    const response = await csrfFetch(`/api/posts/${id}/comments`);
    const data = await response.json();

    return { Comments: data.Comments, id };
  } catch (error) {
    return { error: error };
  }
});

export const createComment = createAsyncThunk(
  'comment/createComment',
  async (data, { rejectWithValue }) => {
    try {
      const { postId } = data;
      const response = await csrfFetch(`/api/posts/${postId}/comment`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      const comment = await response.json();

      return comment;
    } catch (err) {
      if (!err.ok) {
        const errors = await err.json();
        return rejectWithValue(errors.errors);
      }
    }
  },
);

export const updateComment = createAsyncThunk(
  'comment/updateComment',
  async (data, { rejectWithValue }) => {
    try {
      const { id } = data;
      const response = await csrfFetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      const comment = await response.json();

      return comment;
    } catch (err) {
      if (!err.ok) {
        const errors = await err.json();
        return rejectWithValue(errors.errors);
      }
    }
  },
);

export const deleteComment = createAsyncThunk('comment/deleteComment', async (data) => {
  try {
    const { id } = data;
    const response = await csrfFetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });
    await response.json();

    return data;
  } catch (error) {
    return { error: error };
  }
});

const initialState = { comments: null };

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      const postId = action.payload.id;
      const comment = action.payload.Comments;

      if (!comment.length) return { ...state, [postId]: {} };

      const comments = {};
      comment.forEach((comment) => {
        if (!comments[comment.postId]) {
          comments[comment.postId] = {};
        }
        comments[comment.postId][comment.id] = comment;
      });

      return { ...state, ...comments };
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      const { postId, id } = action.payload;

      if (!state[postId]) {
        state[postId] = {};
      }

      state[postId][id] = action.payload;
    });

    builder.addCase(createComment.rejected, (state) => {
      return { ...state };
    });

    builder.addCase(updateComment.fulfilled, (state, action) => {
      const { postId, id } = action.payload;

      if (!state[postId]) {
        state[postId] = {};
      }
      state[postId][id] = action.payload;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      delete state[action.payload.postId][action.payload.id];
    });
  },
});

export default commentSlice.reducer;
