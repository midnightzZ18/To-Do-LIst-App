export function TodoForm({
    task,
    setTask,
    category,
    setCategory,
    priority,
    setPriority,
    dueDate,
    setDueDate,
    handleSubmit,
    translations,
  }) {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={translations.addTaskPlaceholder}
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="personal">{translations.categoryPersonal}</option>
          <option value="work">{translations.categoryWork}</option>
          <option value="urgent">{translations.categoryUrgent}</option>
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">{translations.priorityLow}</option>
          <option value="medium">{translations.priorityMedium}</option>
          <option value="high">{translations.priorityHigh}</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">{translations.addButton}</button>
      </form>
    );
  }