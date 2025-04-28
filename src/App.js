import { useState, useEffect } from "react";
import { TodoForm } from "./components/TodoForm";
import { TodoControls } from "./components/TodoControls";
import { TodoProgress } from "./components/TodoProgress";
import { TodoList } from "./components/TodoList";
import { translations } from "./data/translations";
import { loadFromLocalStorage, saveToLocalStorage } from "./utils/localStorage";
import "./styles/App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState("personal");
  const [priority, setPriority] = useState("medium");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showCompleted, setShowCompleted] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(
    loadFromLocalStorage("darkMode", "false") === "true"
  );
  const [language, setLanguage] = useState(
    loadFromLocalStorage("language", "en")
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [storageWarning, setStorageWarning] = useState(null);

  // Test if localStorage is available
  useEffect(() => {
    const testKey = "test-localstorage";
    try {
      localStorage.setItem(testKey, "test");
      localStorage.removeItem(testKey);
    } catch (err) {
      setStorageWarning(translations[language].storageWarning);
    }
  }, [language]);

  // Load todos from localStorage
  useEffect(() => {
    try {
      const savedTodos = loadFromLocalStorage("todos", []);
      if (Array.isArray(savedTodos)) {
        setTodos(savedTodos);
      }
    } catch (err) {
      setError(translations[language].error);
    } finally {
      setLoading(false);
    }
  }, [language]);

  // Save todos to localStorage
  useEffect(() => {
    if (todos.length === 0) return;
    try {
      saveToLocalStorage("todos", todos);
    } catch (err) {
      setError(translations[language].saveError);
    }
  }, [todos, language]);

  // Save dark mode and language preferences
  useEffect(() => {
    try {
      saveToLocalStorage("darkMode", isDarkMode);
      saveToLocalStorage("language", language);
      document.body.classList.toggle("dark-mode", isDarkMode);
    } catch (err) {
      setError(translations[language].saveError);
    }
  }, [isDarkMode, language]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
      category,
      priority,
      date: new Date().toLocaleDateString(),
      dueDate,
    };

    setTodos([...todos, newTask]);
    setTask("");
    setCategory("personal");
    setPriority("medium");
    setDueDate("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setEditingId(null);
    setEditText("");
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const getSortedAndFilteredTodos = () => {
    let filteredTodos = [...todos];

    if (filterCategory !== "all") {
      filteredTodos = filteredTodos.filter(
        (todo) => todo.category === filterCategory
      );
    }

    if (!showCompleted) {
      filteredTodos = filteredTodos.filter((todo) => !todo.completed);
    }

    return filteredTodos.sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      } else if (sortBy === "dueDate") {
        return (
          (a.dueDate ? new Date(a.dueDate) : new Date(9999, 12, 31)) -
          (b.dueDate ? new Date(b.dueDate) : new Date(9999, 12, 31))
        );
      }
      return new Date(b.date) - new Date(a.date);
    });
  };

  return (
    <div className="App">
      <h1>{translations[language].title}<img src="/cat.png" alt="cat" className="cat-icon" /></h1>

      {storageWarning && <p className="warning">{storageWarning}</p>}
      {error && <p className="error">{error}</p>}
      {loading && <p>{translations[language].loading}</p>}

      <TodoForm
        task={task}
        setTask={setTask}
        category={category}
        setCategory={setCategory}
        priority={priority}
        setPriority={setPriority}
        dueDate={dueDate}
        setDueDate={setDueDate}
        handleSubmit={handleSubmit}
        translations={translations[language]}
      />

      <TodoControls
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        showCompleted={showCompleted}
        setShowCompleted={setShowCompleted}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        language={language}
        setLanguage={setLanguage}
        clearCompleted={clearCompleted}
        translations={translations[language]}
      />

      <TodoProgress todos={todos} translations={translations[language]} />

      <TodoList
        todos={getSortedAndFilteredTodos()}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        startEditing={startEditing}
        saveEdit={saveEdit}
        editingId={editingId}
        editText={editText}
        setEditText={setEditText}
        translations={translations[language]}
        loading={loading}
      />
    </div>
  );
}

export default App;