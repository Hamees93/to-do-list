import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todosSlice";

const AddItem = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the input is not empty before adding
    if (input.trim()) {
      dispatch(addTodo({ title: input.trim() }));
      setInput("");
    }
  };

  return (
    <>
      <form className="flex items-center" onSubmit={handleSubmit}>
        <div className="relative w-full">
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="New Task..."
            required
            onChange={handleChange}
            value={input}
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 p-2.5 px-4 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <span>Add</span>
        </button>
      </form>
    </>
  );
};
export default AddItem;
