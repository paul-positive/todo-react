import { useContext, useMemo } from 'react';
import './App.css';
import { TodosContext } from './context/TodosContext';

function TodoItemsRemaining() {
  const { todos } = useContext(TodosContext);

  function remainingCalc() {
    return todos.filter(todo => !todo.isComplete).length;
  }

  const remaining = useMemo(remainingCalc, [todos]);

  return <>{`${remaining} ${remaining === 1 ? 'Item' : 'Items'} remaining`}</>;
}

TodoItemsRemaining.propTypes = {};

export default TodoItemsRemaining;
