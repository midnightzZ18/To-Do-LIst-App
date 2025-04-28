import { TodoItem } from "./TodoItem";

export function TodoList({
  todos,
  toggleComplete,
  deleteTask,
  startEditing,
  saveEdit,
  editingId,
  editText,
  setEditText,
  translations,
  loading,
}) {
  return (
    <div className="todo-list">
      {todos.length === 0 && !loading ? (
        <p>{translations.noTasks}</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            startEditing={startEditing}
            saveEdit={saveEdit}
            editingId={editingId}
            editText={editText}
            setEditText={setEditText}
            translations={translations}
          />
        ))
      )}
    </div>
  );
}