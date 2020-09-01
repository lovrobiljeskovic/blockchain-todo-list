import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import useInputState from './useInputState';
import { todosCtx } from '../context/TodoProvider';
import { Container } from '@material-ui/core';

const TodoForm = ({}) => {
  const { value, reset, onChange } = useInputState();
  const todoProviderContext = useContext(todosCtx);
  return (
    <Container style={{display: 'flex', justifyContent: 'center'}}>
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
    </Container>
  );
};

export default TodoForm;