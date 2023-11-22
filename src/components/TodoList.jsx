import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { useEffect } from "react";
import { fetchTodos } from "../redux/todosSlice";

const TodoList = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos.todos);
  const loading = useSelector((state) => state.todos.loading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
};
export default TodoList;
