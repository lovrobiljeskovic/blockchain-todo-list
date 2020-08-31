import React from 'react';
import Typography from '@material-ui/core/Typography';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { Container, Box } from '@material-ui/core';

interface IProps {
    todos: any;
    createTask: (content: string) => void;
    deleteTask: (id: number) => void;
}

export const ToDo = ({todos, createTask, deleteTask}: IProps) => {
  return (
    <Container style={{ backgroundColor: '#FFE4C4', marginTop: '80px', width: '500px'}}>
      <Typography component="h1" variant="h2" style={{paddingTop: '20px'}}>
        Todos
      </Typography>

      <TodoForm
        createTask={createTask}
        todos={todos}
      />

      <TodoList deleteTask={deleteTask} todos={todos} />
    </Container>
  );
};