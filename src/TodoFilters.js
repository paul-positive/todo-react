import { useContext } from 'react';
import './App.css';
import { TodosContext } from './context/TodosContext';

function TodoFilters() {
  const { filter, setFilter } = useContext(TodosContext);

  return (
    <div className="inline-flex space-x-1">
      <button
        onClick={() => setFilter('all')}
        className={`bg-transparent hover:bg-blue-500 hover:text-white py-1 px-2 hover:border-transparent rounded text-xs text-gray-500 ${
          filter === 'all' && 'border border-gray-500'
        }`}
      >
        All
      </button>
      <button
        onClick={() => setFilter('active')}
        className={`bg-transparent hover:bg-blue-500 hover:text-white py-1 px-2 hover:border-transparent rounded text-xs text-gray-500 ${
          filter === 'active' && 'border border-gray-500'
        }`}
      >
        Active
      </button>
      <button
        onClick={() => setFilter('completed')}
        className={`bg-transparent hover:bg-blue-500 hover:text-white py-1 px-2 hover:border-transparent rounded text-xs text-gray-500 ${
          filter === 'completed' && 'border border-gray-500'
        }`}
      >
        Completed
      </button>
    </div>
  );
}

TodoFilters.propTypes = {};

export default TodoFilters;
