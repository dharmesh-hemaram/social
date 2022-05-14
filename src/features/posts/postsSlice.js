import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  COMPLETED: 'completed',
  ERROR: 'error'
}

const postAdapter = createEntityAdapter({})

const initialState = postAdapter.getInitialState({
  status: STATUS.IDLE,
  error: null
})

export const fetchPostById = createAsyncThunk('post/fetchById', async (postId) => {
  const response = await api.get(`/posts/${postId}`)
  return response.data
})
export const fetchPostsByUserId = createAsyncThunk('fetch/PostsByUserId', async (userId) => {
  const response = await api.get(`/posts?userId=${userId}`)
  return response.data
})
export const fetchPosts = createAsyncThunk('posts/fetch', async () => {
  const response = await api.get('/posts')
  return response.data
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = STATUS.COMPLETED
      postAdapter.upsertMany(state, action.payload)
    }).addCase(fetchPosts.pending, state => {
      state.status = STATUS.LOADING
    }).addCase(fetchPosts.rejected, (state, action) => {
      state.status = STATUS.ERROR;
      state.error = action.error
    }).addCase(fetchPostById.fulfilled, (state, action) => {
      postAdapter.addOne(state, action.payload)
    }).addCase(fetchPostsByUserId.fulfilled, (state, action) => {
      console.log(action)
      postAdapter.addMany(state, action.payload)
    })
  }
})

export default postsSlice.reducer;
export const { selectIds: selectPostIds, selectAll: selectAllPosts, selectById: selectPostById } = postAdapter.getSelectors(state => state.posts)
export const selectPostsByUser = createSelector([selectAllPosts, (state, userId) => userId], (posts, userId) => {
  return posts.filter(post => post.userId === userId)
})