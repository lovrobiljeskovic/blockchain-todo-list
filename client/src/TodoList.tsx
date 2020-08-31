import React, { useContext, FC } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import { todosCtx } from './context/TodoProvider';

const BlueCheckBox = withStyles({
  root: {
    color: '#5B84B1FF',
    '&$checked': {
      color: '#5B84B1FF',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const TodoList: FC<{}> = ({}) =>  {
  const todoProviderContext = useContext(todosCtx);
  return (
  <List>
    {todoProviderContext.state.todos.map((todo: any, index: number) => (
      <ListItem key={index.toString()} dense button>
      <BlueCheckBox/>
        <ListItemText primary={todo.text} />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => {
              todoProviderContext.deleteTask(todo.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))}
  </List>
  );
}

export default TodoList;
