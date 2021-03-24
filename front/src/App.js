import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  cambiaModal
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
  const formSubmit = e => {
    e.preventDefault()
    const formData = new FormData(e.target), formDataObj = Object.fromEntries(formData.entries())
    setShow(false)
    console.log(formDataObj)
    handleClose()
  }

  const updateModal = (isVisible) => {
  	this.state.isVisible = isVisible;
    this.forceUpdate();
  }

  const estadoModal = useSelector(state => state.todos.modal)

  const anadeTask = () => {
    dispatch(cambiaModal(true))
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
                placeholder="Username"
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
            <Button onClick={anadeTask} variant="outline-primary" className="centro-contenido boton-icono">
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
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Title (Required)</Form.Label>
              <Form.Control type="text"/>
              <Form.Text className="text-muted">
                Valor obligatorio
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text"/>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => dispatch(cambiaModal(false))}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" onClick={formSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
