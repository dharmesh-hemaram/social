import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

const photosAdapter = createEntityAdapter()
const initialState = photosAdapter.getInitialState({})

export const fetchPhotosByAlbum = createAsyncThunk('fetch/photosByAlbum', async (albumId) => {
  const response = await api.get(`/photos?albumId=${albumId}`)
  return response.data
})

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPhotosByAlbum.fulfilled, (state, action) => {
      photosAdapter.addMany(state, action.payload)
    })
  }
})

export default photosSlice.reducer

export const { selectAll: selectAllPhotos } = photosAdapter.getSelectors(state => state.photos)
export const getPhotosByAlbum = createSelector([selectAllPhotos, (state, albumId) => albumId], (photos, albumId) => photos.filter(photo => photo.albumId === albumId))