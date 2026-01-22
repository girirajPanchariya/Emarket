import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Componets/Pages/Home'
import Register from './Componets/Pages/Register'
import LoginPage from './Componets/Pages/LoginPage'


const App = () => {
  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<LoginPage/>}/>
   </Routes>

  )
}

export default App