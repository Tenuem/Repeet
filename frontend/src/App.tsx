import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Layout/Navbar'
import { useState } from 'react'
import {  ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css" 
import { UserProvider } from './Context/authContext'
import CreateNewPopUpWindow from './Components/Layout/PopUpWindow'

function App() {

  const [blur, setBlur] = useState<boolean>(false);

  return (
    <>
      <UserProvider>
        <Navbar setBlur={setBlur} />
        <main className={`max-w-7xl mx-auto p-4 overflow-hidden ${blur ? 'blur-sm' : ''}`}>
          <Outlet />
        </main>
        {blur && <CreateNewPopUpWindow setBlur={setBlur}/>}
        <ToastContainer />
      </UserProvider>
    </>
  )
}

export default App
