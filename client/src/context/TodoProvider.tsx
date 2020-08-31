import React, { FC, useReducer, useCallback, useMemo, createContext, useEffect } from "react";
import { useWeb3Contract, useWeb3Account } from './Web3Provider';

interface TodosCtx {
    state: {
        todos: any[];
    };
    createTask: (content: string) => void;
    deleteTask: (id: number) => void;
}

function reducer(state: any, action: any) {
    switch (action.type) {
        case 'GET_ALL':
            return { todos: action.tasks };
        case 'CREATE_TASK':
            return { todos: [...state.todos, action.todo] };
        case 'DELETE_TASK':
            return { todos: state.todos.filter((item: any) => item.id !== action.id) };
        default:
            throw new Error();
    }
}

export const todosCtx = createContext<TodosCtx>({} as never);

export const TodosProvider: FC<{}> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { todos: [] });
    const web3Contract = useWeb3Contract();
    const web3Account = useWeb3Account();
    useEffect(() => {
        (async () => {
            if (web3Contract) {
                const itemIds = await web3Contract.methods.getItemids().call()
                let temp: Promise<any>[] = [];
                for (let i = 0; i < itemIds.length; i++) {
                    const tasks = web3Contract.methods.items(itemIds[i]).call();;
                    temp.push(tasks);
                }
                dispatch({ type: 'GET_ALL', tasks: await Promise.all(temp) })
            }
        })();
    }, [web3Contract])
    const createTask = useCallback((content: string) => {
        web3Contract.methods.createTask(content).send({ from: web3Account, gas: 3000000 })
            .once('receipt', (receipt: any) => {
                const todo = receipt.events.TaskCreated.returnValues.item;
                dispatch({ type: 'CREATE_TASK', todo })
            })
    }, [web3Contract])

    const deleteTask = useCallback((id: number) => {
        web3Contract.methods.deleteTask(id).send({ from: web3Account, gas: 3000000 })
            .once('receipt', (receipt: any) => {
                dispatch({ type: 'DELETE_TASK', id })
            })
    }, [web3Contract])

    return <todosCtx.Provider value={useMemo(() => ({ state, createTask, deleteTask }), [state])}>{children}</todosCtx.Provider>
}