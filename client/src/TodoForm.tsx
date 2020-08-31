import React from 'react';
import TextField from '@material-ui/core/TextField';
import useInputState from './useInputState';

const TodoForm = ({ todos, createTask }) => {
  const { value, reset, onChange } = useInputState();
  return (
    <div>
      <form onSubmit={(event) => {
          event.preventDefault()
          createTask(value)
          reset();
        }}>
        <TextField
        variant="outlined"
        placeholder="Add todo"
        margin="normal"
        onChange={onChange}
        value={value}
        />
        </form>
    </div>
  );
};

export default TodoForm;