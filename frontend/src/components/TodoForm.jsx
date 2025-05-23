import { useState } from 'react'
import useTodoStore from '../stores/todoStore'
import { toast } from 'react-toastify'

const TodoForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { addTodo } = useTodoStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      toast.error('Title is required')
      return
    }

    try {
      await addTodo({ title, description })
      setTitle('')
      setDescription('')
      toast.success('Todo added successfully')
    } catch (error) {
      toast.error('Failed to add todo')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title*</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="What needs to be done?"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Additional details..."
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Todo
        </button>
      </div>
    </form>
  )
}

export default TodoForm