import useTodoStore from '../stores/todoStore'
import { TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify'

const TodoList = () => {
  const { 
    todos, 
    loading, 
    error,
    connectionStatus,
    deleteTodo, 
    summarizeTodos,
    fetchTodos 
  } = useTodoStore()

  const handleSummarize = async () => {
    try {
      const result = await summarizeTodos()
      toast.success('Summary generated and sent to Slack!')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Todos</h2>
        <div className="flex gap-2">
          <button
            onClick={fetchTodos}
            className="p-2 text-gray-600 hover:text-gray-900"
            title="Refresh"
          >
            <ArrowPathIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleSummarize}
            disabled={todos.length === 0 || loading || connectionStatus !== 'connected'}
            className={`px-4 py-2 rounded flex items-center gap-2 ${
              todos.length === 0 || loading || connectionStatus !== 'connected'
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            Summarize & Send
          </button>
        </div>
      </div>

      {connectionStatus === 'disconnected' && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">
            Disconnected from server. Please check your connection.
          </p>
        </div>
      )}

      {loading && connectionStatus !== 'disconnected' ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : todos.length === 0 ? (
        <p className="text-gray-500 py-4 text-center">
          No todos yet. Add one above!
        </p>
      ) : (
        <ul className="divide-y">
          {todos.map((todo) => (
            <li key={todo._id} className="py-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{todo.title}</h3>
                  {todo.description && (
                    <p className="text-gray-600 mt-1">{todo.description}</p>
                  )}
                </div>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TodoList