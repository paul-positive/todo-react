import { useContext, useState } from 'react';
import './App.css';
import { TodosContext } from './context/TodosContext';

function TodoForm() {
  const { todos, setTodos, todoId, setTodoId } = useContext(TodosContext);

  const [todoInput, setTodoInput] = useState('');

  function handleInput(e) {
    e.preventDefault();
    setTodoInput(e.target.value);
  }

  function addTodo(e) {
    e.preventDefault();
    if (todoInput.trim().length === 0) return;

    setTodos([
      {
        id: todoId,
        title: todoInput,
        isComplete: false,
        isEditing: false,
      },
      ...todos,
    ]);

    setTodoId(prevId => prevId + 1);
    setTodoInput('');
  }

  return (
    <form action="#" onSubmit={addTodo}>
      <input
        value={todoInput}
        onChange={handleInput}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Wada ya want?"
      />
    </form>
  );
}

export default TodoForm;
