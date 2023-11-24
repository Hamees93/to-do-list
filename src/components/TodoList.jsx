import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { useEffect } from "react";
import {
  fetchTodos,
  filteredTodosSelector,
  setTodos,
} from "../redux/todosSlice";
import Filter from "./Filter";
import Sorting from "./Sorting";
import { DragDropContext } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";

const TodoList = () => {
  const dispatch = useDispatch();

  const todos = useSelector(filteredTodosSelector);
  const loading = useSelector((state) => state.todos.loading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    // check if we get any data from local storage
    if (todos.length === 0) {
      dispatch(fetchTodos());
    }
  }, [dispatch]);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const draggedItemIndex = result.source.index;
    const droppedItemIndex = result.destination.index;

    const draggedTodo = todos[draggedItemIndex];
    const droppedTodo = todos[droppedItemIndex];

    const updatedTodos = [...todos];
    updatedTodos[draggedItemIndex] = droppedTodo;
    updatedTodos[droppedItemIndex] = draggedTodo;

    dispatch(setTodos(updatedTodos));
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Filter />
      <Sorting />

      <DragDropContext onDragEnd={handleDragEnd}>
        <StrictModeDroppable droppableId="list">
          {(provided) => (
            <ul
              className="space-y-2"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {todos.map((todo, index) => (
                <TodoItem todo={todo} index={index} key={todo.id} />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </>
  );
};
export default TodoList;
