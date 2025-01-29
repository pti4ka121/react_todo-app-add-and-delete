import React, { useState } from 'react';

interface HeaderProps {
  loading: boolean;
  todosLeft: number;
  newTodo: string;
  setNewTodo: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  onAddTodo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  newTodo,
  setNewTodo,
  inputRef,
  onAddTodo,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (newTodo.trim() === '') {
        setError('Поле не може бути порожнім або містити лише пробіли!');

        return;
      }

      setError(null);
      onAddTodo();
    }
  };

  return (
    <header className="todoapp__header">
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      {error && <p className="error-message">{error}</p>}
    </header>
  );
};
