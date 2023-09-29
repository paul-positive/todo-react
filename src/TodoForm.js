import PropTypes from 'prop-types';
import { useState } from 'react';
import './App.css';

function TodoForm(props) {
  const [todoInput, setTodoInput] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (todoInput.trim().length === 0) return;

    props.addTodo(todoInput);

    setTodoInput('');
  }

  function handleInput(e) {
    e.preventDefault();
    setTodoInput(e.target.value);
  }

  return (
    <form action="#" onSubmit={handleSubmit}>
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

TodoForm.propTypes = {
  addTodo: PropTypes.func,
};

export default TodoForm;
