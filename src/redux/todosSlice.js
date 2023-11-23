// src/redux/todosSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the asynchronous thunk
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();
  return data;
});

const initialState = {
  todos: [],
  loading: false,
  error: null,
  filter: "all",
  search: "", // Add search state variable
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    toggleTodo: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todos[todoIndex].completed = !state.todos[todoIndex].completed;
    },
    removeTodo: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todos.splice(todoIndex, 1);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push({
        id: Math.random().toString(36).substr(2, 9),
        title: action.payload.title,
        completed: false,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  },
});
export const { toggleTodo, removeTodo, setFilter, setSearch, addTodo } =
  todosSlice.actions;
export default todosSlice.reducer;
