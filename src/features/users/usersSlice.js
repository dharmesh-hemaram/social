import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

const userAdapter = createEntityAdapter({})

const initialState = userAdapter.getInitialState({
})

export const fetchUsers = createAsyncThunk('fetch/users', async () => {
  const response = await api.get('/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      userAdapter.upsertMany(state, action.payload)
    })
  }
})

export default usersSlice.reducer;
export const { selectIds: selectUserIds, selectAll: selectAllUsers, selectById: selectUserById } = userAdapter.getSelectors(state => state.users)