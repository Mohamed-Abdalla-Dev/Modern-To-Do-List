import { useState } from "react";

function TodoForm({ onAddTodo }) {
  const [todo, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.trim()) return; // Prevent adding an empty task
    onAddTodo({
      id: Date.now(),
      text: todo,
      completed: false,
    });
    setTodo(""); // Clear the input field after submission
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          className="todo-input"
          type="text"
          placeholder="Enter a todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit" className="todo-button">
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
