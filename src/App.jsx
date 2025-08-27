import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './templates/Layout'
import Home from './pages/Home'
import Add from './pages/Add'

function App() {
   return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home />}></Route>
        <Route path="/add" element={<Add />}></Route>
      </Route>
    </Routes>
  )
}

export default App
