import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import api from "../../api";
import { STATUS } from "../posts/postsSlice";

const commentsAdapter = createEntityAdapter({

})

const initialState = commentsAdapter.getInitialState({
  status: STATUS.IDLE,
  error: null
})

export const fetchCommentsByPost = createAsyncThunk('fetch/comments', async (postId) => {
  const response = await api.get(`/comments?postId=${postId}`)
  return response.data
})

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCommentsByPost.fulfilled, (state, action) => {
      state.status = STATUS.COMPLETED
      commentsAdapter.upsertMany(state, action.payload)
    }).addCase(fetchCommentsByPost.pending, state => {
      state.status = STATUS.LOADING
    }).addCase(fetchCommentsByPost.rejected, (state, action) => {
      state.status = STATUS.ERROR
      state.error = action.payload
    })
  }
})
export default commentsSlice.reducer
export const { selectAll: selectAllComments, selectById: selectCommentById, selectIds: selectCommentIds } = commentsAdapter.getSelectors(state => state.comments)
export const getCommentsByPost = createSelector([selectAllComments, (state, postId) => postId], (comments, postId) => comments.filter(comment => comment.postId === postId))