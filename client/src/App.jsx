import React, { Profiler } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import SignIn from './pages/Sign-In';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
  import PrivateRoute from './components/privateRoute';
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element = {<Home/>}></Route>
        <Route path='/sign-in' element = {<SignIn/>}></Route>
        <Route path='/sign-up' element = {<SignUp/>}></Route>
        <Route path='/About' element = {<About/>}></Route>

        {/* <Route path='/Profile' element = {<Profile/>}></Route> */}
        <Route element={<PrivateRoute/>}>
          <Route path='/Profile' element = {<Profile/>}></Route>
        </Route>

        </Routes>
    </BrowserRouter>
  )
}
