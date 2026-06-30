function TodoItem({ todo, onToggle, onDelete }) {
  const handleContentClick = (e) => {
    // Prevent toggle when clicking the delete button
    if (e.target.closest(".delete-button")) return;
    onToggle();
  };

  return (
    <div className={`container todo-item ${todo.completed ? "completed" : ""}`}>
      <div className="todo-content" onClick={handleContentClick}>
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={onToggle}
          onClick={(e) => e.stopPropagation()}
        />
        <span className="todo-text">{todo.text}</span>
      </div>
      <button className="delete-button" onClick={() => onDelete(todo.id)}>
        ×
      </button>
    </div>
  );
}

export default TodoItem;
