import React, { FC, createContext, useContext, useState, useEffect } from 'react'
import Web3 from 'web3';
import ToDoList from '../build/contracts/TodoList.json'

interface Item {
  events: any;
  links: any;
  address: string;
  transactionHash: string;
}

interface Network {
  [index: string]: Item
}

interface Web3Ctx {
    contract: any,
    account: any
}
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))

const web3Ctx = createContext<Web3Ctx>({} as never)

export const useWeb3Contract = () => {
    const useWeb3Ctx = useContext(web3Ctx);
    if(useWeb3Ctx) {
    return useWeb3Ctx.contract;
    }
}

export const useWeb3Account = () => {
    const useWeb3Ctx = useContext(web3Ctx);
    if(useWeb3Ctx) {
    return useWeb3Ctx.account[0];
    }
}

export const Web3Provider: FC<{}> = ({ children }) => {
    const [state, setState] = useState<Web3Ctx>();

    useEffect(() => {
      (
      async () => {
        let networks: Network = ToDoList.networks;
        if (web3) {
          const account = await web3.eth.getAccounts();
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = networks[networkId];
          const contract: any = new web3.eth.Contract(
            //@ts-ignore
            ToDoList.abi as AbiItem,
            deployedNetwork && deployedNetwork.address,
          );
          setState(
            {contract, account}
          )
        }
      })();
    }, [])

    return <web3Ctx.Provider value={state as Web3Ctx}>
        {children}
    </web3Ctx.Provider>
}