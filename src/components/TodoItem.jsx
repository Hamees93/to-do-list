import { useDispatch } from "react-redux";
import { toggleTodo, removeTodo } from "../redux/todosSlice";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleRemove = () => {
    dispatch(removeTodo(todo.id));
  };

  return (
    <>
      <li className="flex justify-between items-center  border-2  rounded-lg p-2.5 px-3">
        <div className="flex items-center w-full">
          <input
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onChange={handleToggle}
            checked={todo.completed}
          />
          <label
            className={`ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 ${
              todo.completed ? "line-through" : ""
            }`}
          >
            {todo.title}
          </label>
        </div>
        <button
          type="button"
          className="p-1.5 px-2.5 rounded-lg bg-red-500 text-white hover:bg-red-600 cursor-pointer"
          onClick={handleRemove}
        >
          Delete
        </button>
      </li>
    </>
  );
};
export default TodoItem;
