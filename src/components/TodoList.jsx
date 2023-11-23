import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { useEffect } from "react";
import { fetchTodos, setFilter, setSearch } from "../redux/todosSlice";

const TodoList = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => {
    const filteredTodos = state.todos.todos.filter((todo) => {
      if (state.todos.search === "") {
        return true;
      } else {
        return todo.title
          .toLowerCase()
          .includes(state.todos.search.toLowerCase());
      }
    });

    if (state.todos.filter === "all") {
      return filteredTodos;
    } else if (state.todos.filter === "active") {
      return filteredTodos.filter((todo) => !todo.completed);
    } else if (state.todos.filter === "completed") {
      return filteredTodos.filter((todo) => todo.completed);
    }
    return filteredTodos;
  });

  const loading = useSelector((state) => state.todos.loading);
  const error = useSelector((state) => state.todos.error);
  const selectedFilter = useSelector((state) => state.todos.filter);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };

  const handleSearchChange = (event) => {
    dispatch(setSearch(event.target.value));
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between my-3">
        <div>
          <button
            type="button"
            onClick={() => handleFilterChange("all")}
            className={`p-1.5 px-3 rounded-l-lg ${
              selectedFilter == "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 cursor-pointer hover:bg-blue-500 hover:text-white"
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange("active")}
            className={`p-1.5 px-3 border-l border-r border-gray-300 ${
              selectedFilter == "active"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 cursor-pointer hover:bg-blue-500 hover:text-white"
            }`}
          >
            Active
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange("completed")}
            className={`p-1.5 px-3 rounded-r-lg ${
              selectedFilter == "completed"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 cursor-pointer hover:bg-blue-500 hover:text-white"
            }`}
          >
            Completed
          </button>
        </div>
        <div>
          <input
            type="text"
            onChange={handleSearchChange}
            placeholder="search by keyword.."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
};
export default TodoList;
