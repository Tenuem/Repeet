import { Route, Routes } from 'react-router-dom'
import './App.css'

import Navbar from './Components/Layout/Navbar'
import Revisions from './Pages/Revisions'
import Explore from './Pages/Explore'
import { useState, type SyntheticEvent } from 'react'
import CreateForm from './Components/Layout/CreateForm'
import { addSetAPI } from './Services/SetService'

function App() {
  const [blur, setBlur] = useState<Boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    const setId = e.target[0].value;
    //console.log(e.target[2].value)
    const numOfFlashcards = setId === "createNew" ? (e.target.length - 3)/3 : (e.target.length - 2)/3; // every flashcard consist of 3 fields in the form
    console.log(numOfFlashcards);
    if (setId === "createNewss"){
      console.log(e.target[2].value)
      await addSetAPI(e.target[1].value)
        .then((res) => {
            if (res?.status === 204) {
                //toast.success("Stock added to portfolio!");

                console.log(res?.data);
            }
            console.log(res);
        })
        .catch((e) => {
            console.log(e);
        });
    }
  }

    const onSetCreate = (e: any) => {
        e.preventDefault();
        console.log(e.target[0])
        /*
        addSetAPI(e.target[0].value)
        .then((res) => {
            if (res?.status === 204) {
                //toast.success("Stock added to portfolio!");
                console.log("correct");
            }
        })
        .catch((e) => {
            console.log(e);
        });
        */
    }

  return (
    <>
      <Navbar popup={setBlur}/>
        <main className={`max-w-7xl mx-auto p-4 overflow-hidden ${blur ? 'blur-sm' : ''}`}>
            <Routes>
              <Route path="/" element={<div>Home</div>} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/revisions" element={<Revisions />} />
              <Route path="/games" element={<div>Games</div>} />
            </Routes>
            
        </main>
        {blur && <CreateForm setBlur={setBlur} handleOnFormSubmit={handleSubmit}/>}
    </>
  )
}

export default App
