import { useEffect } from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import useTodoStore from '../stores/todoStore'

const TodoPage = () => {
  const { fetchTodos, connectionStatus } = useTodoStore()

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Todo Summary Assistant</h1>
      <TodoForm />
      <TodoList />
    </div>
  )
}

export default TodoPage