import React from "react";
import TodoForm from "./Form/TodoForm";
import TodoList from "../component/Form/TodoList";
import { TodoProvider } from "./utils/GlobalState";


function Chores() {
  return (
    <div className="container">
      <TodoProvider>
        <TodoForm />
        <TodoList />
      </TodoProvider>
    </div>
  );
}

export default Chores;
