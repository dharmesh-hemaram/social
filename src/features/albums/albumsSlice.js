import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import api from "../../api";
import { STATUS } from "../posts/postsSlice";


const albumAdapter = createEntityAdapter({})

export const fetchAlbums = createAsyncThunk('fetch/album', async () => {
  const response = await api.get('/albums');
  return response.data
})
export const fetchAlbumsByUserId = createAsyncThunk('fetch/albums?userId=', async (userId) => {
  const response = await api.get(`/albums?userId=${userId}`);
  return response.data
})

export const fetchAlbumById = createAsyncThunk('fetch/albumById', async (albumId) => {
  const response = await api.get(`/albums/${albumId}`);
  return response.data
})

const initialState = albumAdapter.getInitialState({
  status: STATUS.IDLE,
  error: null
})

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAlbums.pending, state => {
      state.status = STATUS.LOADING
    }).addCase(fetchAlbums.rejected, (state, action) => {
      state.status = STATUS.ERROR;
      state.error = action.payload;
    }).addCase(fetchAlbums.fulfilled, (state, action) => {
      state.status = STATUS.COMPLETED
      albumAdapter.setAll(state, action.payload)
    }).addCase(fetchAlbumById.fulfilled, (state, action) => {
      albumAdapter.addOne(state, action.payload)
    }).addCase(fetchAlbumsByUserId.fulfilled, (state, action) => {
      albumAdapter.addMany(state, action.payload)
    })
  }
})

export const {
  selectAll: selectAllAlbums,
  selectById: selectAlbumById,
  selectIds: selectAlbumIds
} = albumAdapter.getSelectors((state) => state.albums);

export default albumsSlice.reducer

export const getAlbumsByUser = createSelector([selectAllAlbums, (state, userId) => userId], (albums, userId) => albums.filter(album => album.userId === userId))