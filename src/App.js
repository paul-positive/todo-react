import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

import useToggle from './hooks/useToggle';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Study React',
      isComplete: false,
      isEditing: false,
    },
    {
      id: 2,
      title: 'Study Laravel',
      isComplete: true,
      isEditing: false,
    },
    {
      id: 3,
      title: 'Study TS',
      isComplete: false,
      isEditing: false,
    },
  ]);

  const [todoId, setTodoId] = useState(4);

  function addTodo(todo) {
    setTodos([
      {
        id: todoId,
        title: todo,
        isComplete: false,
        isEditing: false,
      },
      ...todos,
    ]);

    setTodoId(prevId => prevId + 1);
  }

  function handleDelete(id) {
    setTodos([...todos].filter(todo => todo.id !== id));
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

  function handleClearCompleted() {
    setTodos([...todos].filter(todo => !todo.isComplete));
  }

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

  function remainingCalc() {
    return todos.filter(todo => !todo.isComplete).length;
  }

  const [name, setName] = useState();
  const nameInput = useRef(null);

  useEffect(() => {
    nameInput.current.focus();

    // this is like the componentWillUnmount()
    return function cleanup() {
      // cleanup stuff here
    };

    // it watches states for changes to re-run like componentWillUpdate().
    // to only run once, leave a blank array [].
    // will always run if no 2nd param entered.
  }, [name]);

  const remaining = useMemo(remainingCalc, [todos]);

  const [hideNameSection, setHideNameSection] = useToggle();

  return (
    <div className="App">
      <div className="w-96 space-y-5">
        <button
          onClick={setHideNameSection}
          className="bg-transparent hover:bg-blue-500 hover:text-white py-1 px-2 hover:border-transparent rounded text-xs text-gray-500"
        >
          Hide Name Section
        </button>

        {hideNameSection && (
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl text-gray-400">What is your name?</h1>
            </div>
            <form action="#">
              <input
                ref={nameInput}
                value={name}
                onChange={event => setName(event.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder=""
              />
            </form>
            {name && <p>Hello, {name}</p>}
          </div>
        )}

        <div>
          <h1 className="text-6xl text-gray-400">`Tada!</h1>
        </div>

        <TodoForm addTodo={addTodo} />

        <TodoList
          todos={todos}
          handleDelete={handleDelete}
          handleCheck={handleCheck}
          handleEdit={handleEdit}
          handleUpdate={handleUpdate}
          handleCancelEdit={handleCancelEdit}
          handleClearCompleted={handleClearCompleted}
          handleCompleteAll={handleCompleteAll}
          todosFiltered={todosFiltered}
          remaining={remaining}
        />
      </div>
    </div>
  );
}

export default App;
