import { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import AddItem from "./components/AddItem";

function App() {
  // const addTodo = (title) => {
  //   setTodos((preTodo) => [
  //     ...preTodo,
  //     { userId: "1", id: 3, title: title, completed: false },
  //   ]);
  // };

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col p-3 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto p-3 sm:p-6 w-full rounded-lg shadow-md border bg-gray-50">
        <h1 className="text-gray-700 text-3xl text-center font-bold">
          Todo App
        </h1>
        <div className="mt-5">{/* <AddItem addTodo={addTodo} /> */}</div>
        <div className="mt-5">
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default App;
