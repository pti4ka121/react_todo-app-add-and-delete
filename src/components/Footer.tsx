import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

interface FooterProps {
  todos: Todo[];
  todosLeft: number;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  loading: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  todos,
  todosLeft,
  filter,
  onFilterChange,
  loading,
}) => {
  const hasTodos = todos.length > 0;
  const completedExists = todos.some(todo => todo.completed);

  const filterLinks = Object.values(Filter).map(option => (
    <a
      key={option}
      href={`#/${option}`}
      className={classNames('filter__link', { selected: filter === option })}
      data-cy={`FilterLink${option.charAt(0).toUpperCase() + option.slice(1)}`}
      onClick={() => onFilterChange(option)}
    >
      {option.charAt(0).toUpperCase() + option.slice(1)}
    </a>
  ));

  return (
    <>
      {hasTodos && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {todosLeft} item{todosLeft !== 1 ? 's' : ''} left
          </span>

          <nav className="filter" data-cy="Filter">
            {filterLinks}
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={loading || !completedExists}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
