import React, { Component } from 'react';
import './App.css';
import getWeb3 from './getWeb3';
import ToDoList from './build/contracts/TodoList.json'
import { ToDo } from './ToDo';

interface Item {
  events: any;
  links: any;
  address: string;
  transactionHash: string;
}

interface Example {
  [index: string]: Item
}


class App extends Component {
  state = { tasks: [], web3: null, account: null, contract: null};
  componentDidMount = async () => {
    try {
      let networks: Example = ToDoList.networks;
      const web3: any = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] })
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = networks[networkId];
      const instance = new web3.eth.Contract(
        ToDoList.abi,
        deployedNetwork && deployedNetwork.address,
      );
      const itemIds = await instance.methods.getItemids().call()
      for (let i = 0; i < itemIds.length; i++) {
        //@ts-ignore
        const tasks = await instance.methods.items(itemIds[i]).call();
        this.setState({ tasks: [...this.state.tasks, tasks] });
      }
      this.setState({ loading: false })

      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  createTask = (content: string) => {
    const { contract, account } = this.state;
    //@ts-ignore
    contract.methods.createTask(content).send({ from: account, gas: 3000000 })
      .once('receipt', (receipt: any) => {
        const task = receipt.events.TaskCreated.returnValues.item;
        this.setState({ tasks: [...this.state.tasks, task] })
      })
  }

  deleteTask = (id: number) => {
    const { contract, account, tasks } = this.state;
    //@ts-ignore
    contract.methods.deleteTask(id).send({ from: account, gas: 3000000 })
      .once('receipt', (receipt: any) => {
        //@ts-ignore
        const filteredTasks = tasks.filter((item) => item.id !== id);
        this.setState({ tasks: filteredTasks })
      })
  }

  render() {
    const { web3 } = this.state;
    if (!web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
          <ToDo createTask={this.createTask} deleteTask={this.deleteTask} todos={this.state.tasks} />
      </div>
    );
  }
}

export default App;