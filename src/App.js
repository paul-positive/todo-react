import { useEffect, useRef } from 'react';
import './App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

import { TodosContext } from './context/TodosContext';
import useLocalStorage from './hooks/useLocalStorage';
import useToggle from './hooks/useToggle';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);

  const [todoId, setTodoId] = useLocalStorage('todoId', 1000);
  const [filter, setFilter] = useLocalStorage('filter', 'all');

  const [name, setName] = useLocalStorage('name', '');
  const nameInput = useRef(null);

  useEffect(() => {
    nameInput.current.focus();

    // setName(JSON.parse(localStorage.getItem('name')) ?? '');
    // this is like the componentWillUnmount()

    return function cleanup() {
      // cleanup stuff here
    };

    // it watches states for changes to re-run like componentWillUpdate().
    // to only run once, leave a blank array [].
    // will always run if no 2nd param entered.
  }, [name]);

  const [hideNameSection, setHideNameSection] = useToggle();

  function handleNameInput(event) {
    setName(event.target.value);
    // localStorage.setItem('name', JSON.stringify(event.target.value));
  }

  return (
    <TodosContext.Provider
      value={{ todos, setTodos, todoId, setTodoId, filter, setFilter }}
    >
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
                  onChange={handleNameInput}
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

          <TodoForm />

          <TodoList />
        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
