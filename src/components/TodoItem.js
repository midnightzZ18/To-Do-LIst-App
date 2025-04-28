export function TodoItem({
    todo,
    toggleComplete,
    deleteTask,
    startEditing,
    saveEdit,
    editingId,
    editText,
    setEditText,
    translations,
  }) {
    return (
      <div
        className={`todo-item ${todo.completed ? "completed" : ""} ${
          todo.priority
        } ${
          todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed
            ? "overdue"
            : ""
        }`}
      >
        {editingId === todo.id ? (
          <div className="edit-container">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button onClick={() => saveEdit(todo.id)}>
              {translations.saveButton}
            </button>
            <button onClick={() => startEditing(null)}>
              {translations.cancelButton}
            </button>
          </div>
        ) : (
          <>
            <div className="todo-content">
              <span className="todo-text" onClick={() => toggleComplete(todo.id)}>
                {todo.text}
              </span>
              <span className="todo-meta">
                {todo.category in translations
                  ? translations[
                      `category${todo.category.charAt(0).toUpperCase() + todo.category.slice(1)}`
                    ]
                  : todo.category}{" "}
                |{" "}
                {todo.priority in translations
                  ? translations[
                      `priority${todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}`
                    ]
                  : todo.priority}{" "}
                | {todo.date} | {translations.due}:{" "}
                {todo.dueDate || translations.noDueDate}
              </span>
            </div>
            <div className="todo-actions">
              <button
                className="edit-button"
                onClick={() => startEditing(todo.id, todo.text)}
              >
                Edit
              </button>
              <button className="delete-button" onClick={() => deleteTask(todo.id)}>
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    );
  }