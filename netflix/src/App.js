import React from 'react'
import './App.scss'
import Home from './Home/Home'
import Watch from './components/Watch/Watch'
import Register from './components/register/Register'
import Login from './components/Login/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import SortingTable from './components/Table/SortingTable'
import UpdateUser from './components/UpdateUser/UpdateUser'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddMovie from './components/AddMovie/AddMovies'
import UpdateMovie from './components/UpdateMovie/UpdateMovie'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/home' exact element={<Home />} />
          <Route path='/watch' element={<Watch />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/SortingTable' element={<SortingTable />} />
          <Route path='/UpdateUser' element={<UpdateUser />} />
          <Route path='/Addmovie' element= {<AddMovie />}/>
          <Route path='/UpdateMovie' element={<UpdateMovie />}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer className="Toastify" />
    </div>
  )
}

export default App
