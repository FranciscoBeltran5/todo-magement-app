import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  lista: [],
  modal: false,
  status: 'idle',
  panelInfo: false,
  todoSeleccionado: {
    title: '',
    name: '',
    description: '',
    completed: false
  },
  newOrEdit: true,
  error: null
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('http://localhost:8080/todos')
  const respAux = await response.json()
  return respAux
})

export const addNewTodo = createAsyncThunk('todos/addNewTodo',
  async (initialTodo) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: initialTodo.name,
          title: initialTodo.title,
          description: (initialTodo.description) ? initialTodo.description : ''
        })
    };
    const response = await fetch('http://localhost:8080/todos', requestOptions)
    var constResp = await response.json()
    return constResp
  }
)

export const updateTodo = createAsyncThunk('todos/updateTodo',
  async (initialTodo) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: (initialTodo.name) ? initialTodo.name : '',
          title: initialTodo.title,
          description: (initialTodo.description) ? initialTodo.description : '',
          completed: initialTodo.completed
        })
    };
    const response = await fetch('http://localhost:8080/todos/'+initialTodo.id, requestOptions)
    var constResp = await response.json()
    return constResp
  }
)

export const delTodo = createAsyncThunk('todos/delTodo',
  async (id) => {
    const requestOptions = {
        method: 'DELETE'
    };
    const response = await fetch('http://localhost:8080/todos/'+id, requestOptions)
    var res = await response.json()
    return res
  }
)

export const cambiaCompleted = createAsyncThunk('todos/cambiaCompleted',
  async (todo) => {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completed: todo.completed
        })
    };
    const response = await fetch('http://localhost:8080/todos/' + todo.id, requestOptions)
    var constResp = await response.json()
    return constResp.completed
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
    cambiaCampoSeleccionado(state, action) {
      state.todoSeleccionado[action.payload.campo] = action.payload.valor
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
      state.lista = action.payload
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [cambiaCompleted.fulfilled]: (state, action) => {
      state.todoSeleccionado.completed = action.payload
    },
    [addNewTodo.fulfilled]: (state, action) => {
      state.status = 'idle'
    },
    [delTodo.fulfilled]: (state, action) => {
      state.status = 'idle'
    },
    [updateTodo.fulfilled]: (state, action) => {
      state.status = 'idle'
    }
  },
})

export const { todoUpdated, todoAdded, cambiaModal, cambiaPanelInfo, cambiaSeleccionado, cambiaNewOrEdit, cambiaCampoSeleccionado } = todoSlice.actions
export default todoSlice.reducer

export const selectAllTodos = (state) => state.todos.lista

export const selectTodobyId = (state, todoId) =>
  state.todos.lista.find((todo) => todo.id === todoId)
