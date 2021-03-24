import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  lista: [],
  modal: false,
  status: 'idle',
  panelInfo: false,
  todoSeleccionado: {},
  newOrEdit: true,
  error: null
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('http://localhost:8080/todos')
  const respAux = await response.json()
  return respAux
})

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async (initialTodo) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          name: initialTodo.name,
          title: initialTodo.title,
          description: initialTodo.description,
          completed: initialTodo.completed
        }
    };
    const response = await fetch('http://localhost:3000/todos', requestOptions)
    return response.post
  }
)

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action) {
      const { todoId, completed } = action.payload
      const existingTodo = state.todos.find((todo) => todo.id === todoId)
      if (existingTodo) {
        existingTodo.completed = completed
      }
    },
    todoUpdated(state, action) {
      const { id, name, title, description } = action.payload
      const existingTodo = state.todos.find((todo) => todo.id === id)
      if (existingTodo) {
        existingTodo.name = name
        existingTodo.title = title
        existingTodo.description = description
      }
    },
    cambiaModal(state, action) {
      state.modal = action.payload
    },
    cambiaPanelInfo(state, action) {
      state.panelInfo = action.payload
    },
    cambiaSeleccionado(state, action) {
      state.todoSeleccionado = action.payload
    },
    cambiaNewOrEdit(state, action) {
      state.newOrEdit = action.payload
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.lista = state.lista.concat(action.payload)
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewTodo.fulfilled]: (state, action) => {
      state.todos.push(action.payload)
    },
  },
})

export const { todoUpdated, todoAdded, cambiaModal, cambiaPanelInfo, cambiaSeleccionado, cambiaNewOrEdit } = todoSlice.actions
export default todoSlice.reducer

export const selectAllTodos = (state) => state.todos.lista

export const selectTodobyId = (state, todoId) =>
  state.todos.lista.find((todo) => todo.id === todoId)
