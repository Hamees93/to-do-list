import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSearch } from "../redux/todosSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const selectedFilter = useSelector((state) => state.todos.filter);

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };

  const handleSearchChange = (event) => {
    dispatch(setSearch(event.target.value));
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row item-start sm:items-center sm:justify-between my-3">
        <div>
          <button
            type="button"
            onClick={() => handleFilterChange("all")}
            className={`text-sm sm:text-base p-1.5 px-3 rounded-l-lg ${
              selectedFilter == "all"
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-800 cursor-pointer hover:bg-blue-700 hover:text-white"
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange("active")}
            className={`text-sm sm:text-base p-1.5 px-3 border-l border-r border-gray-300 ${
              selectedFilter == "active"
                ? "bg-orange-600 text-white"
                : "bg-gray-200 text-gray-800 cursor-pointer hover:bg-orange-600 hover:text-white"
            }`}
          >
            Active
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange("completed")}
            className={`text-sm sm:text-base p-1.5 px-3 rounded-r-lg ${
              selectedFilter == "completed"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800 cursor-pointer hover:bg-green-600 hover:text-white"
            }`}
          >
            Completed
          </button>
        </div>
        <div className="w-[100%] sm:w-[40%] mt-3 sm:mt-0">
          <input
            type="text"
            onChange={handleSearchChange}
            placeholder="Search by keyword.."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
    </>
  );
};
export default Filter;
