import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { useEffect } from "react";
import { fetchTodos } from "../redux/todosSlice";
import Filter from "./Filter";

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

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Filter />
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
};
export default TodoList;
