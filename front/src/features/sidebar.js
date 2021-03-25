import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  cambiaPanelInfo,
  cambiaNewOrEdit,
  cambiaCompleted,
  cambiaModal,
  delTodo
} from './todo/todoSlice';
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';
import '../App.css'

const Sidebar = props => {
    const dispatch = useDispatch();
    let clase = 'sidenav';

    const estadoPanelInfo = useSelector(state => state.todos.panelInfo)
    const todo = useSelector(state => state.todos.todoSeleccionado)
      const todoStatus = useSelector((state) => state.todos.status)

    if (estadoPanelInfo) {
      clase += ' abierto';
    } else {
      clase += ' cerrado';
    }

    const editaTodo = () => {
      dispatch(cambiaNewOrEdit(false))
      dispatch(cambiaModal(true))
      dispatch(cambiaPanelInfo(false))
    }

    const cambioCompleted = (event) => {
        dispatch(cambiaCompleted({"id": todo.id, "completed": event.target.value}))
    }

    const manejaBorrado = () => {
      dispatch(delTodo(todo.id))
      dispatch(cambiaPanelInfo(false))
    }

    return (
      <>
        <div id="mySidenav" className={clase}>
          <div>
            <a href="javascript:void(0)" className="closebtn" onClick={() => dispatch(cambiaPanelInfo(false))}>&times;</a>
          </div>
          <div className="titulo-side"><h2>{todo.title}</h2></div>
          <div className="margeny">
            <Form.Control as="select" value={todo.completed} onChange={cambioCompleted}>
              <option value="true">Completed</option>
              <option value="false">Pending</option>
            </Form.Control>
          </div>
          <div className="margeny">
            <span><strong>Created</strong></span><br />
            <span>{(todo.createdAt) ? todo.createdAt.substring(0,10) : 'n/a'}</span>
          </div>
          <div className="margeny">
            <span><strong>Description</strong></span><br />
            <span>{(todo.description) ? todo.description : 'No description'}</span>
          </div>
          <div className="margeny">
            <span>Updated {(todo.updatedAt) ? todo.updatedAt.substring(0,10) : 'n/a'}</span>
          </div>
          <div className="botonesPanel">
            <Button className="botonPanel" onClick={editaTodo}><Pencil className="iconoBotPan textoAzul"/>Edit</Button>
            <Button className="botonPanel" onClick={manejaBorrado}><Trash className="iconoBotPan textoAzul"/>Delete</Button>
          </div>
        </div>
      </>
        );
  };
  export default Sidebar
