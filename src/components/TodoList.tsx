import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  filteredTodos: Todo[];
  loading: boolean;
  isActive: number | undefined;
  onDeleteTodo: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  filteredTodos,
  loading,
  isActive,
  onDeleteTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          loading={loading}
          isActive={isActive}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </section>
  );
};
