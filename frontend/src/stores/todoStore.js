import { create } from 'zustand'
import api from '../services/api'

const useTodoStore = create((set) => ({
  todos: [],
  loading: false,
  error: null,
  connectionStatus: 'disconnected',
  
  fetchTodos: async () => {
    set({ loading: true, error: null })
    try {
      const response = await api.get('/todos')
      set({ 
        todos: response.data,
        loading: false,
        connectionStatus: 'connected'
      })
    } catch (error) {
      set({ 
        error: error.message,
        loading: false,
        connectionStatus: 'disconnected'
      })
      throw error
    }
  },
  
  addTodo: async (todo) => {
    try {
      const response = await api.post('/todos', todo)
      set((state) => ({ 
        todos: [response.data, ...state.todos] 
      }))
      return response.data
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  },
  
  deleteTodo: async (id) => {
    try {
      await api.delete(`/todos/${id}`)
      set((state) => ({
        todos: state.todos.filter(todo => todo._id !== id)
      }))
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  },
  
  summarizeTodos: async () => {
    try {
      const response = await api.post('/todos/summarize')
      return response.data
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  }
}))

export default useTodoStore