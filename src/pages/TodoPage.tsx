import { useTodos } from '@/hooks/useTodos';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFooter from '@/components/TodoFooter';
import styles from './TodoPage.module.css';

export default function TodoPage() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>todos</h1>
        <div className={styles.card}>
          <TodoInput onAdd={addTodo} />
          {todos.length > 0 ? (
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ) : (
            <p className={styles.empty}>No todos yet. Add one above!</p>
          )}
          {(activeCount > 0 || completedCount > 0) && (
            <TodoFooter
              activeCount={activeCount}
              completedCount={completedCount}
              filter={filter}
              onFilterChange={setFilter}
              onClearCompleted={clearCompleted}
            />
          )}
        </div>
      </div>
    </div>
  );
}
