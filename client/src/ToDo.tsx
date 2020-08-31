import Typography from '@material-ui/core/Typography';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { Container } from '@material-ui/core';
import React, { FC } from "react";

export const ToDo: FC<{}> = ({}) => {
  return (
    <Container style={{ backgroundColor: '#FFE4C4', marginTop: '80px', width: '500px'}}>
      <Typography component="h1" variant="h2" style={{paddingTop: '20px'}}>
        Todos
      </Typography>
      <TodoForm/>
      <TodoList/>
    </Container>
  );
};