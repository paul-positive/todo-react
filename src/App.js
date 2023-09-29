import { useState } from 'react';
import './App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

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

  return (
    <div className="App">
      <div className="w-96 space-y-5">
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
        />
      </div>
    </div>
  );
}

export default App;
