import { useState, useEffect } from "react"
import axios from 'axios'
import { useDispatch } from "react-redux"
import Register from "./components/pages/auth/Register"
import Login from "./components/pages/auth/Login"
import Home from './components/pages/Home'

import Navbar from './components/layouts/Navbar'
import { Routes, Route } from 'react-router-dom'

//Users
import HomeUser from "./components/pages/user/Home"

//Admin
import MenubarAdmin from "./components/layouts/MenubarAdmin"

import HomeAdmin from './components/pages/admin/Home'
import ManageAdmin from "./components/pages/admin/ManageAdmin"

//Routes
import UserRoute from "./components/routes/UserRoute"
import AdminRoute from "./components/routes/AdminRoute"



const App = () => {
  const idtoken = localStorage.token
  const dispatch = useDispatch()

  const currentUser = async (authtoken) => {
    await axios.post(`${import.meta.env.VITE_API}/current_user`, {}, {
      headers: {
          authtoken
      }
  }).then((response) => {
    // console.log(response.data.data.role)
    dispatch({
      type : "LOGIN",
      payload : {
        token : idtoken,
        username : response.data.data.username,
        role : response.data.data.role
      }
    })
  }).catch((err) => {
    console.log(err)
  })
  }
  
  if(idtoken) {
    currentUser(idtoken)
  }
 
  return (
    <>
    <Navbar />
    <Routes>
    <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />


      <Route path="/admin/index" element={
        <AdminRoute>
          <MenubarAdmin />
        <HomeAdmin /> 
        </AdminRoute> } />

        <Route path="/admin/manage_admin" element={
        <AdminRoute>
        <MenubarAdmin />
        <ManageAdmin /> 
        </AdminRoute> } />

      <Route path="/user/index" element={
        <UserRoute>
      <HomeUser />
      </UserRoute> } />

    </Routes>
    </>
  )
}

export default App