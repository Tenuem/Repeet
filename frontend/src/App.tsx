import { Route, Routes } from 'react-router-dom'
import './App.css'

import Navbar from './Components/Layout/Navbar'
import Revisions from './Pages/Revisions'
import Explore from './Pages/Explore'

function App() {
  return (
    <>
      <Navbar/>
        <main className="max-w-7xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/revisions" element={<Revisions />} />
            <Route path="/games" element={<div>Games</div>} />
          </Routes>
         
        </main>
    </>
  )
}

export default App
