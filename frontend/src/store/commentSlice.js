import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

// Thunk functions
export const fetchComments = createAsyncThunk('comment/postComments', async (id) => {
  try {
    const response = await csrfFetch(`/api/posts/${id}/comments`);
    const data = await response.json();

    return data.Comments;
  } catch (error) {
    return { error: error };
  }
});

export const createComment = createAsyncThunk('comment/createComment', async (data) => {
  try {
    const { context, postId } = data;
    const response = await csrfFetch(`/api/posts/${postId}/comment`, {
      method: 'POST',
      body: JSON.stringify({
        postId,
        context,
      }),
    });
    const comment = await response.json();

    return comment;
  } catch (error) {
    return { error: error };
  }
});

export const updateComment = createAsyncThunk(
  'comment/updateComment',
  async (data, id) => {
    try {
      const response = await csrfFetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      const comment = await response.json();

      return comment;
    } catch (error) {
      return { error: error };
    }
  },
);

export const deleteComment = createAsyncThunk('comment/deleteComment', async (id) => {
  try {
    const response = await csrfFetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });
    await response.json();

    return id;
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
      const comments = { ...state };
      action.payload.forEach((comment) => {
        comments[comment.id] = comment;
      });

      return comments;
    });

    builder.addCase(createComment.fulfilled, (state, action) => {
      return { ...state, [action.payload.id]: action.payload };
    });

    builder.addCase(updateComment.fulfilled, (state, action) => {
      return { ...state, [action.payload.id]: action.payload };
    });

    builder.addCase(deleteComment.fulfilled, (state, action) => {
      const comments = { ...state };
      delete comments[action.payload];
      return comments;
    });
  },
});

export default commentSlice.reducer;
