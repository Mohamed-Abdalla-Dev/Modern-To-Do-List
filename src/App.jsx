import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import "./App.css";
import TodoItem from "./components/TodoItem";

function App() {
  // 1. The initial value of the to-dos is read directly from local storage.
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        return JSON.parse(savedTodos);
      } catch (error) {
        console.error("Failed to parse saved todos:", error);
        return [];
      }
    }
    return [];
  });

  // 2. Initial value of the filter
  const [todoToShow, setTodoToShow] = useState(() => {
    return localStorage.getItem("savedFilter") || "all"; // Or whatever your filter's default value is.
  });

  const [isLoaded] = useState(true);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  // Save filter to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("todoFilter", todoToShow);
    }
  }, [todoToShow, isLoaded]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const updateTodoToShow = (s) => {
    setTodoToShow(s);
  };

  const toggleTodoComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // Filter todos based on selected filter
  const getFilteredTodos = () => {
    if (todoToShow === "active") {
      return todos.filter((todo) => !todo.completed);
    } else if (todoToShow === "completed") {
      return todos.filter((todo) => todo.completed);
    }
    return todos; // Show all
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1>To-do list</h1>
        <p>Organize your tasks easily</p>
      </header>
      <TodoForm onAddTodo={addTodo} />
      <div className="todos-container">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => toggleTodoComplete(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))
        ) : (
          <div className="container no-todos">
            {todoToShow === "all" && "No tasks"}
            {todoToShow === "active" && "All tasks are complete ✓"}
            {todoToShow === "completed" && "No completed tasks"}
          </div>
        )}
      </div>
      <div className="container filter-buttons">
        <button
          className={`todo-button ${todoToShow === "all" ? "active" : ""}`}
          onClick={() => updateTodoToShow("all")}
        >
          All ({todos.length})
        </button>
        <button
          className={`todo-button ${todoToShow === "active" ? "active" : ""}`}
          onClick={() => updateTodoToShow("active")}
        >
          Active ({todos.filter((t) => !t.completed).length})
        </button>
        <button
          className={`todo-button ${todoToShow === "completed" ? "active" : ""}`}
          onClick={() => updateTodoToShow("completed")}
        >
          Completed ({todos.filter((t) => t.completed).length})
        </button>
      </div>
    </div>
  );
}

export default App;
