import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

export const TODOS_FILTER = {
  ALL: () => (true),
  ACTIVE: todo => !todo.completed,
  COMPLETED: todo => todo.completed
}

const todosAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.completed ? 1 : -1
})
const initialState = todosAdapter.getInitialState({
  filter: 'ACTIVE'
})
export const fetchTodosByUser = createAsyncThunk('fetch/todos?userId={userId}', async (userId) => {
  const response = await api.get(`/todos?userId=${userId}`);
  return response.data
})
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filter = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchTodosByUser.fulfilled, (state, action) => {
      todosAdapter.addMany(state, action.payload)
    })
  }
})

export default todosSlice.reducer
const selectSelf = (state) => state.todos
export const { changeFilter } = todosSlice.actions;
export const { selectAll: selectAllTodos } = todosAdapter.getSelectors(selectSelf)
export const getTodosFilter = createSelector(selectSelf, state => TODOS_FILTER[state.filter])
export const getUserFilter = (state, userId) => userId
export const getTodosByUser = createSelector(
  [selectAllTodos, getTodosFilter, getUserFilter],
  (todos, filterFunc, userId) => {
    return todos.filter(todo => todo.userId === userId).filter(filterFunc)
  })