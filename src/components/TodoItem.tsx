import { useState } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';
import { Todo } from '@/types';
import styles from './TodoItem.module.css';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);

  function handleEditSubmit(): void {
    onEdit(todo.id, editValue);
    setEditing(false);
  }

  function handleEditKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') handleEditSubmit();
    if (e.key === 'Escape') {
      setEditValue(todo.text);
      setEditing(false);
    }
  }

  function handleEditCancel(): void {
    setEditValue(todo.text);
    setEditing(false);
  }

  return (
    <li className={clsx(styles.item, todo.completed && styles.completed)}>
      {editing ? (
        <div className={styles.editRow}>
          <input
            className={styles.editInput}
            value={editValue}
            autoFocus
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValue(e.target.value)}
            onKeyDown={handleEditKeyDown}
          />
          <button className={styles.iconBtn} onClick={handleEditSubmit} aria-label="Save">
            <Check size={16} />
          </button>
          <button className={styles.iconBtn} onClick={handleEditCancel} aria-label="Cancel">
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className={styles.viewRow}>
          <button
            className={clsx(styles.checkbox, todo.completed && styles.checkboxChecked)}
            onClick={() => onToggle(todo.id)}
            aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
          >
            {todo.completed && <Check size={12} strokeWidth={3} />}
          </button>
          <span className={styles.text}>{todo.text}</span>
          <div className={styles.actions}>
            <button
              className={styles.iconBtn}
              onClick={() => setEditing(true)}
              aria-label="Edit"
            >
              <Pencil size={15} />
            </button>
            <button
              className={clsx(styles.iconBtn, styles.deleteBtn)}
              onClick={() => onDelete(todo.id)}
              aria-label="Delete"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
