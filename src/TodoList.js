import { useContext } from 'react';
import './App.css';
import TodoFilters from './TodoFilters';
import TodoItemsRemaining from './TodoItemsRemaining';
import { TodosContext } from './context/TodosContext';

function TodoList(props) {
  const { todos, setTodos, filter } = useContext(TodosContext);

  function handleCompleteAll() {
    setTodos(
      [...todos].map(todo => {
        return {
          ...todo,
          isComplete: true,
        };
      })
    );
  }
  function handleClearCompleted() {
    setTodos([...todos].filter(todo => !todo.isComplete));
  }
  function handleCheck(id) {
    setTodos(
      [...todos].map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            isComplete: !todo.isComplete,
          };
        }

        return todo;
      })
    );
  }
  function handleEdit(id) {
    setTodos(
      [...todos].map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            isEditing: true,
          };
        }

        return todo;
      })
    );
  }
  function handleUpdate(e, id) {
    setTodos(
      [...todos].map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            title:
              e.target.value.trim().length === 0 ? todo.title : e.target.value,
            isEditing: false,
          };
        }

        return todo;
      })
    );
  }
  function handleCancelEdit(id) {
    setTodos(
      [...todos].map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            isEditing: false,
          };
        }

        return todo;
      })
    );
  }
  function todosFiltered(filter) {
    switch (filter) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter(todo => !todo.isComplete);
      case 'completed':
        return todos.filter(todo => todo.isComplete);
      default:
        return todos;
    }
  }
  function handleDelete(id) {
    setTodos([...todos].filter(todo => todo.id !== id));
  }
  return (
    <>
      <div className="border rounded shadow space-y-5 p-5">
        {todosFiltered(filter).map((todo, index) => (
          <div className="relative flex items-start items-center" key={todo.id}>
            <div className="flex h-6 items-center">
              <input
                id={`todo${todo.id}`}
                checked={todo.isComplete}
                onChange={() => handleCheck(todo.id)}
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="ml-3 text-md flex-grow">
              {todo.isEditing ? (
                <input
                  onBlur={event => handleUpdate(event, todo.id)}
                  onKeyDown={event =>
                    (event.key === 'Enter' && handleUpdate(event, todo.id)) ||
                    (event.key === 'Escape' && handleCancelEdit(todo.id))
                  }
                  defaultValue={todo.title}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Todo"
                  autoFocus
                />
              ) : (
                <label
                  onDoubleClick={() => handleEdit(todo.id)}
                  htmlFor={`todo${todo.id}`}
                  className={`text-gray-500 ${
                    !todo.isComplete || 'line-through'
                  }`}
                >
                  {todo.title}
                </label>
              )}
            </div>
            <button onClick={() => handleDelete(todo.id)}>
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path
                  d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z"
                  stroke="currentColor"
                  fill="none"
                  fillRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="relative flex justify-between">
        <button
          onClick={handleCompleteAll}
          className="bg-transparent hover:bg-blue-500 hover:text-white py-1 px-2 border border-gray-500 hover:border-transparent rounded text-xs text-gray-500"
        >
          Check All
        </button>
        <p className="text-gray-500">
          <TodoItemsRemaining />
        </p>
      </div>

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-300" />

      <div className="relative flex justify-between">
        <TodoFilters />

        <button
          onClick={handleClearCompleted}
          className="bg-transparent hover:bg-blue-500 hover:text-white py-1 px-2 border border-gray-500 hover:border-transparent rounded text-xs text-gray-500"
        >
          Clear Completed
        </button>
      </div>
    </>
  );
}

TodoList.propTypes = {};

export default TodoList;
