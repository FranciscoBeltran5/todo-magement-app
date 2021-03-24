import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  cargaTodos,
  fetchTodos,
  cambiaPanelInfo,
  cambiaSeleccionado
} from './todoSlice';
import styles from './Todo.module.css';
import { Table } from 'react-bootstrap';


export function Todo() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.lista)

  const todoStatus = useSelector((state) => state.todos.status)
  const error = useSelector((state) => state.todos.error)

  const cliCkFila = (todo) => {
    dispatch(cambiaSeleccionado(todo))
    dispatch(cambiaPanelInfo(true))
  }

  useEffect(() => {
    if (todoStatus === 'idle') {
      dispatch(fetchTodos())
    }
  }, [todoStatus, dispatch])

  let content

  if (todoStatus === 'loading') {
    content = <tr><th>Loading...</th></tr>
  } else if (todoStatus === 'succeeded') {
    content = todos.map((todo, index) => {
      return (<tr key={`${todo.id}`} onClick={() => cliCkFila(todo)}>
                <th>{(todo.completed) ? 'Sí' : 'No'}</th>
                <th>{todo.title}</th>
                <th>{todo.createdAt.substr(0,10)}</th>
                <th>{(todo.description) ? todo.description : 'Sin descripción'}</th>
              </tr>);
    })
  } else if (todoStatus === 'failed') {
    content = <tr><th>{error}</th></tr>
  }

  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th></th>
            <th>Titled</th>
            <th>Created</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {content}
        </tbody>
      </Table>
    </>
  );
}
