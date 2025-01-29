import React from 'react';

interface HeaderProps {
  loading: boolean;
  todosLeft: number;
  newTodo: string;
  setNewTodo: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  onAddTodo: () => void;
  setAppError: (message: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  newTodo,
  setNewTodo,
  inputRef,
  onAddTodo,
  setAppError,
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (newTodo.trim() === '') {
      setAppError('Поле не може бути порожнім або містити лише пробіли!');

      return;
    }

    onAddTodo();
  };

  return (
    <header className="todoapp__header">
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
