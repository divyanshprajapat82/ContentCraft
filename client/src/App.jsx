import React from 'react'
import Login from './common/Login'
import { BrowserRouter, Route, Routes } from 'react-router'
import Register from './common/Register'
import Common from './common/Common'
import Deshboard from './pages/Deshboard'
import ContentCreation from './pages/ContentCreation'
import ContentList from './pages/ContentList'

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Common />}>
            <Route path='/deshboard' element={<Deshboard />} />
            <Route path='/content-creation' element={<ContentCreation />} />
            <Route path='/content-list' element={<ContentList />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </>
  )
}
