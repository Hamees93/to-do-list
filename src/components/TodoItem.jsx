import { useDispatch } from "react-redux";
import { toggleTodo, removeTodo, setPriority } from "../redux/todosSlice";
import { useEffect, useRef, useState } from "react";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [priorityDropdownOpen, setPriorityDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setPriorityDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const priorityStatus = [
    { id: 1, status: "Low", color: "green" },
    { id: 2, status: "Medium", color: "yellow" },
    { id: 3, status: "High", color: "red" },
  ];

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleRemove = () => {
    dispatch(removeTodo(todo.id));
  };

  const toggleDropdown = () => {
    setPriorityDropdownOpen((prevState) => !prevState);
  };

  const handleChangePriority = (priority) => {
    dispatch(setPriority({ id: todo.id, priority: priority.id }));
    toggleDropdown();
  };

  return (
    <>
      <li
        className={`flex justify-between items-center border-2 rounded-lg p-2 px-3 border-l-4 ${
          todo.completed
            ? "border-l-green-600 bg-green-200"
            : "border-l-orange-600"
        }`}
      >
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
        <div className="relative mx-2" ref={dropdownRef}>
          <button
            type="button"
            onClick={toggleDropdown}
            className={`text-xs font-medium`}
          >
            {todo.priority
              ? priorityStatus.find((priority) => priority.id === todo.priority)
                  .status
              : "Low"}
          </button>
          {priorityDropdownOpen && (
            <ul className="absolute z-10 rounded shadow overflow-hidden mt-1 divide-y">
              {priorityStatus.map((priority) => (
                <li
                  key={priority.id}
                  className="bg-gray-200 p-1 px-3 text-sm text-gray-800 hover:bg-gray-100"
                >
                  <button onClick={() => handleChangePriority(priority)}>
                    {priority.status}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="button"
          className="ml-2 p-1.5 px-2.5 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 cursor-pointer"
          onClick={handleRemove}
        >
          Remove
        </button>
      </li>
    </>
  );
};
export default TodoItem;
