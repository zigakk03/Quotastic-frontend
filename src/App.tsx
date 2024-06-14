import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Page404 from './pages/Page404'
import Login from './pages/Login'
import Register from './pages/Register'
import UserPage from './pages/UserPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/user/:user_id' element={<UserPage />} />
      <Route path='*' element={<Page404 />} />
    </Routes>
  )
}

export default App