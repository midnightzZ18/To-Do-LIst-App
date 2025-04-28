export function TodoProgress({ todos, translations }) {
    const completionPercentage =
      todos.length > 0
        ? Math.round(
            (todos.filter((todo) => todo.completed).length / todos.length) * 100
          )
        : 0;
  
    return (
      <div className="progress-bar">
        <span>
          {translations.progress}: {completionPercentage}%
        </span>
        <div
          className="progress-bar-fill"
          style={{
            width: `${completionPercentage}%`,
          }}
        ></div>
      </div>
    );
  }