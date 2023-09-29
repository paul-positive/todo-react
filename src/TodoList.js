import PropTypes from 'prop-types';
import './App.css';

function TodoList(props) {
  const incompleteItems = props.todos.filter(todo => todo.isComplete === false);

  return (
    <>
      <div className="border rounded shadow space-y-5 p-5">
        {props.todos.map((todo, index) => (
          <div className="relative flex items-start items-center" key={todo.id}>
            <div className="flex h-6 items-center">
              <input
                id={`todo${todo.id}`}
                checked={todo.isComplete}
                onChange={() => props.handleCheck(todo.id)}
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="ml-3 text-md flex-grow">
              {todo.isEditing ? (
                <input
                  onBlur={event => props.handleUpdate(event, todo.id)}
                  onKeyDown={event =>
                    (event.key === 'Enter' &&
                      props.handleUpdate(event, todo.id)) ||
                    (event.key === 'Escape' && props.handleCancelEdit(todo.id))
                  }
                  defaultValue={todo.title}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Todo"
                  autoFocus
                />
              ) : (
                <label
                  onDoubleClick={() => props.handleEdit(todo.id)}
                  htmlFor={`todo${todo.id}`}
                  className={`text-gray-500 ${
                    !todo.isComplete || 'line-through'
                  }`}
                >
                  {todo.title}
                </label>
              )}
            </div>
            <button onClick={() => props.handleDelete(todo.id)}>
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
        <button className="bg-transparent hover:bg-blue-500 hover:text-white py-1 px-2 border border-gray-500 hover:border-transparent rounded text-xs text-gray-500">
          Check All
        </button>
        <p className="text-gray-500">
          {`${incompleteItems.length} ${
            incompleteItems.length === 1 ? 'Item' : 'Items'
          } remaining`}
        </p>
      </div>

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-300" />

      <div className="relative flex justify-between">
        <div className="inline-flex space-x-1">
          <button className="bg-transparent hover:bg-blue-500 hover:text-white py-1 px-2 border border-gray-500 hover:border-transparent rounded text-xs text-gray-500">
            All
          </button>
          <button className="bg-transparent hover:bg-blue-500 hover:text-white py-1 px-2 hover:border-transparent rounded text-xs text-gray-500">
            Active
          </button>
          <button className="bg-transparent hover:bg-blue-500 hover:text-white py-1 px-2 hover:border-transparent rounded text-xs text-gray-500">
            Completed
          </button>
        </div>

        <button className="bg-transparent hover:bg-blue-500 hover:text-white py-1 px-2 border border-gray-500 hover:border-transparent rounded text-xs text-gray-500">
          Clear Completed
        </button>
      </div>
    </>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleCheck: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleCancelEdit: PropTypes.func.isRequired,
};

export default TodoList;
