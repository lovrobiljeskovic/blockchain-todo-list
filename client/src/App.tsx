import React from 'react';
import './App.css';
import { ToDo } from './components/ToDo';
import { Web3Provider } from './context/Web3Provider';
import { TodosProvider } from './context/TodoProvider';

interface Item {
  events: any;
  links: any;
  address: string;
  transactionHash: string;
}

interface Example {
  [index: string]: Item
}

export const App = () => {
  return (
    <div className="App">
      <Web3Provider>
        <TodosProvider>
          <ToDo>
          </ToDo>
        </TodosProvider>
      </Web3Provider>
    </div>
  );
};