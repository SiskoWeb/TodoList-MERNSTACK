

import './App.css'

import { Navbar } from "./components/Navbar/Navbar";
import { Login } from './Pages/Login/Login';
import { Signup } from './Pages/Signup/Signup';
import { TaskForm } from './Pages/taskForm/TaskForm';
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
function App() {

  const [user, setUser] = useState('')

  const res = useSelector(state => state.auth.createUser)


  useEffect(() => {
    if (localStorage.getItem("user") != null)
      setUser(JSON.parse(localStorage.getItem("user")))
  }, [res])


  return (
    <div className='App'>
      <BrowserRouter>


        <Routes>
          <Route path='/' element={<TaskForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="*" element={<h1>This Page not Found</h1>} />

        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div >
  )
}

export default App
