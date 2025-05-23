import axios from 'axios'
import { toast } from 'react-toastify'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use((config) => {
  // Add auth token if exists
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle different status codes
      if (error.response.status === 401) {
        // Handle unauthorized
      }
      toast.error(error.response.data.message || 'An error occurred')
    } else if (error.request) {
      toast.error('No response from server. Please check your connection.')
    } else {
      toast.error('Request failed to send.')
    }
    return Promise.reject(error)
  }
)

export default api