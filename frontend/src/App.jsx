import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TodoPage from './pages/TodoPage'
import Layout from './components/Layout'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TodoPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App