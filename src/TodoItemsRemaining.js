import PropTypes from 'prop-types';
import './App.css';

function TodoItemsRemaining(props) {
  return (
    <>
      {`${props.remaining} ${
        props.remaining === 1 ? 'Item' : 'Items'
      } remaining`}
    </>
  );
}

TodoItemsRemaining.propTypes = {
  remaining: PropTypes.number.isRequired,
};

export default TodoItemsRemaining;
