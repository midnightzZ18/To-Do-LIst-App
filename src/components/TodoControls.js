export function TodoControls({
    sortBy,
    setSortBy,
    filterCategory,
    setFilterCategory,
    showCompleted,
    setShowCompleted,
    isDarkMode,
    setIsDarkMode,
    language,
    setLanguage,
    clearCompleted,
    translations,
  }) {
    return (
      <div className="controls">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">{translations.sortByDate}</option>
          <option value="priority">{translations.sortByPriority}</option>
          <option value="dueDate">{translations.sortByDueDate}</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">{translations.allCategories}</option>
          <option value="personal">{translations.categoryPersonal}</option>
          <option value="work">{translations.categoryWork}</option>
          <option value="urgent">{translations.categoryUrgent}</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
          />
          {translations.showCompleted}
        </label>
        <button onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? translations.lightMode : translations.darkMode}
        </button>
        <button onClick={() => setLanguage(language === "en" ? "th" : "en")}>
          {language === "en" ? "🇹🇭 ไทย" : "🇬🇧 English"}
        </button>
        <button onClick={clearCompleted}>{translations.clearCompleted}</button>
      </div>
    );
  }