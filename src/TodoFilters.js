import PropTypes from 'prop-types';
import './App.css';

function TodoFilters(props) {
  return (
    <div className="inline-flex space-x-1">
      <button
        onClick={() => props.onFilter('all')}
        className={`bg-transparent hover:bg-blue-500 hover:text-white py-1 px-2 hover:border-transparent rounded text-xs text-gray-500 ${
          props.filter === 'all' && 'border border-gray-500'
        }`}
      >
        All
      </button>
      <button
        onClick={() => props.onFilter('active')}
        className={`bg-transparent hover:bg-blue-500 hover:text-white py-1 px-2 hover:border-transparent rounded text-xs text-gray-500 ${
          props.filter === 'active' && 'border border-gray-500'
        }`}
      >
        Active
      </button>
      <button
        onClick={() => props.onFilter('completed')}
        className={`bg-transparent hover:bg-blue-500 hover:text-white py-1 px-2 hover:border-transparent rounded text-xs text-gray-500 ${
          props.filter === 'completed' && 'border border-gray-500'
        }`}
      >
        Completed
      </button>
    </div>
  );
}

TodoFilters.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default TodoFilters;
