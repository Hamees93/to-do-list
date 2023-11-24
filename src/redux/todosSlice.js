import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

// Function to get todos from local storage
const getTodosFromLocalStorage = () => {
  try {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error("Error loading todos from local storage:", error);
    return [];
  }
};

// Function to save todos to local storage
const saveTodosToLocalStorage = (todos) => {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    console.error("Error saving todos to local storage:", error);
  }
};

// Define the asynchronous thunk
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();
  return data;
});

const initialState = {
  todos: getTodosFromLocalStorage(),
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
      saveTodosToLocalStorage(state.todos); // Save todos to local storage
    },
    removeTodo: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todos.splice(todoIndex, 1);
      saveTodosToLocalStorage(state.todos); // Save todos to local storage
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
      saveTodosToLocalStorage(state.todos); // Save todos to local storage
    },
    setPriority: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[todoIndex].priority = action.payload.priority;
      saveTodosToLocalStorage(state.todos); // Save todos to local storage
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
        saveTodosToLocalStorage(state.todos); // Save todos to local storage
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  },
});
export const {
  toggleTodo,
  removeTodo,
  setFilter,
  setSearch,
  addTodo,
  setPriority,
} = todosSlice.actions;
export default todosSlice.reducer;

// Create selectors using createSelector
export const selectTodos = (state) => state.todos.todos;
export const selectSearch = (state) => state.todos.search;
export const selectFilter = (state) => state.todos.filter;

export const filteredTodosSelector = createSelector(
  [selectTodos, selectSearch, selectFilter],
  (todos, search, filter) => {
    const filteredTodos = todos.filter((todo) => {
      if (search === "") {
        return true;
      } else {
        return todo.title.toLowerCase().includes(search.toLowerCase());
      }
    });

    if (filter === "all") {
      return filteredTodos;
    } else if (filter === "active") {
      return filteredTodos.filter((todo) => !todo.completed);
    } else if (filter === "completed") {
      return filteredTodos.filter((todo) => todo.completed);
    }
    return filteredTodos;
  }
);
