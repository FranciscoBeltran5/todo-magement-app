import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addNewTodo,
  updateTodo,
  cambiaModal,
  cambiaNewOrEdit,
  cambiaSeleccionado,
  cambiaCampoSeleccionado
} from './features/todo/todoSlice';
import { Container, Col, Row, Modal, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { Todo } from './features/todo/Todo';
import { CalendarWeek, PlusCircle } from 'react-bootstrap-icons';
import Sidebar from './features/sidebar.js'
import './App.css';

function App() {
  const dispatch = useDispatch();
  // Modal
  const [show, setShow] = useState(false);
  // Modal text
  const newOrEdi = useSelector(state => state.todos.newOrEdit)
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const updateModal = (isVisible) => {
  	this.state.isVisible = isVisible;
    this.forceUpdate();
  }

  const estadoModal = useSelector(state => state.todos.modal)
  const todoSeleccionado = useSelector(state => state.todos.todoSeleccionado)

  const anadeTask = () => {
    dispatch(cambiaSeleccionado({
      title: '',
      description: ''
    }))
    dispatch(cambiaNewOrEdit(true))
    dispatch(cambiaModal(true))
  }

  const submitModal = (e) => {
    e.preventDefault()
    if (newOrEdi) {
      dispatch(cambiaCampoSeleccionado({"campo":"title","valor":""}))
      dispatch(cambiaCampoSeleccionado({"campo":"description","valor":""}))
      dispatch(addNewTodo(todoSeleccionado))
    } else {
      dispatch(updateTodo(todoSeleccionado))
    }
    dispatch(cambiaModal(false))
  }

  return (
    <div className="App bg-light">
      <Container fluid className="fondo-blanco">
        <Row className="bg-light py-3 texto-izq px-0">
          <h1>My Tasks</h1>
        </Row>
        <Row className="centro-contenido texto-izq my-2">
          <Col xs={8}>
            Tasks
          </Col>
          <Col xs={2}>
            <InputGroup>
              <FormControl
                placeholder="12/May/2021"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon2">
                  <CalendarWeek></CalendarWeek>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col xs={2} className="separador">
            <Button onClick={anadeTask} variant="outline-primary textoAzul" className="centro-contenido boton-icono">
              <PlusCircle className="iconoCirculo"></PlusCircle>Add Task
            </Button>
          </Col>
        </Row>
        <Row>
          <Todo></Todo>
        </Row>
      </Container>
      <Sidebar></Sidebar>
      <Modal show={estadoModal} onHide={handleClose}>
        <Form>
          <Modal.Header>
            <Modal.Title>{(newOrEdi) ? 'New' : 'Edit'} Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formTitle">
              <Form.Label>Title (Required)</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  value={todoSeleccionado.title}
                  onChange={(e) => {dispatch(cambiaCampoSeleccionado({"campo":"title","valor":e.target.value}))}}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Required
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={todoSeleccionado.description}
                onChange={(e) => {dispatch(cambiaCampoSeleccionado({"campo":"description","valor":e.target.value}))}}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => dispatch(cambiaModal(false))}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" onClick={submitModal} className="otroAzul textoBlanco">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
