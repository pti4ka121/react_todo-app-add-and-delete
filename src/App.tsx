import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createTodo, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Error } from './components/Error';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isActive] = useState<number>();
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [newTodo, setNewTodo] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const setAppError = (message: string) => {
    setErrorMessage(message);
  };

  const loadTodos = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const todosData = await getTodos();

      setTodos(todosData);
    } catch (error) {
      setAppError('Unable to load todos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleAddTodo = async () => {
    if (!newTodo.trim()) {
      setAppError('Title should not be empty');

      return;
    }

    const newTask: Todo = {
      id: Date.now(),
      title: newTodo.trim(),
      completed: false,
      userId: 1,
    };

    setTodos(prevTodos => [...prevTodos, newTask]);

    setLoading(true);

    try {
      const createdTodo = await createTodo(newTask.title);

      setTodos(prevTodos =>
        prevTodos.map(todo => (todo.id === newTask.id ? createdTodo : todo)),
      );

      setNewTodo('');

      if (typeof window.createCallback === 'function') {
        window.createCallback();
      }
    } catch (error) {
      setAppError('Unable to add todo');

      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== newTask.id));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === Filter.Active) {
      return !todo.completed;
    }

    if (filter === Filter.Completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        {loading && todos.length === 0 && (
          <div className="modal overlay is-active">Loading...</div>
        )}
        <Header
          loading={loading}
          todosLeft={todos.filter(todo => !todo.completed).length}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          inputRef={inputRef}
          onAddTodo={handleAddTodo}
          setAppError={setAppError}
        />

        <TodoList
          filteredTodos={filteredTodos}
          loading={loading}
          isActive={isActive}
          onDeleteTodo={handleDeleteTodo}
        />

        <Footer
          todos={todos}
          todosLeft={todos.filter(todo => !todo.completed).length}
          filter={filter}
          onFilterChange={setFilter}
          loading={loading}
        />
      </div>

      <Error errorMessage={errorMessage} onClose={() => setErrorMessage('')} />
    </div>
  );
};
