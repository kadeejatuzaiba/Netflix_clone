
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Player from './Pages/Player/Player'
import MyList from './Pages/MyList/MyList'
import New from './Pages/NavLinks/new'
import Tv from './Pages/NavLinks/tv'
import Movie from './Pages/NavLinks/Movie'

import ProtectedRoute from './Components/ProtectedRoute'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <div>
      <ToastContainer theme='dark'/>

      <Routes>

      
        <Route path="/login" element={<Login />} />

       
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/player/:id" element={
          <ProtectedRoute>
            <Player />
          </ProtectedRoute>
        } />

        <Route path="/tv" element={
          <ProtectedRoute>
            <Tv />
          </ProtectedRoute>
        } />

        <Route path="/movies" element={
          <ProtectedRoute>
            <Movie />
          </ProtectedRoute>
        } />

        <Route path="/new" element={
          <ProtectedRoute>
            <New />
          </ProtectedRoute>
        } />

        <Route path="/my-list" element={
          <ProtectedRoute>
            <MyList />
          </ProtectedRoute>
        } />

      </Routes>
    </div>
  )
}

export default App