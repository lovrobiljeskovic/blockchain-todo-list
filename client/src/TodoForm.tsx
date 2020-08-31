import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import useInputState from './useInputState';
import { todosCtx } from './context/TodoProvider';

const TodoForm = ({}) => {
  const { value, reset, onChange } = useInputState();
  const todoProviderContext = useContext(todosCtx);
  return (
    <div>
      <form onSubmit={(event) => {
          event.preventDefault()
          todoProviderContext.createTask(value)
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