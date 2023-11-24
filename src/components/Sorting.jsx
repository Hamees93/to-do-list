import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setSort } from "../redux/todosSlice";
import { useSelector } from "react-redux";

const Sorting = () => {
  const dispatch = useDispatch();
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const sortedBy = useSelector((state) => state.todos.sort);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSortDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setSortDropdownOpen((prevState) => !prevState);
  };

  const handleSorting = (sort) => {
    dispatch(setSort(sort));
    toggleDropdown();
  };

  return (
    <>
      <div className="flex mb-3">
        <span>Sort By: </span>
        <div className="relative mx-2" ref={dropdownRef}>
          <button
            type="button"
            onClick={toggleDropdown}
            className={`text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 px-3 p-1 rounded-lg`}
          >
            {sortedBy}
          </button>

          {sortDropdownOpen && (
            <ul className="absolute z-10 rounded shadow overflow-hidden mt-1 divide-y flex flex-col">
              <li className="bg-gray-200 p-1 px-3 text-sm text-gray-800 hover:bg-gray-100">
                <button
                  className="whitespace-nowrap"
                  onClick={() => handleSorting("Default")}
                >
                  Default
                </button>
              </li>
              <li className="bg-gray-200 p-1 px-3 text-sm text-gray-800 hover:bg-gray-100">
                <button
                  className="whitespace-nowrap"
                  onClick={() => handleSorting("Low Priority")}
                >
                  Low Priority
                </button>
              </li>
              <li className="bg-gray-200 p-1 px-3 text-sm text-gray-800 hover:bg-gray-100">
                <button
                  className="whitespace-nowrap"
                  onClick={() => handleSorting("High Priority")}
                >
                  High Priority
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
export default Sorting;
