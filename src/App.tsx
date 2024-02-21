import { Routes, Route } from "react-router-dom";
import './index.css'

import TestPage from "./pages/TestPage";

function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<TestPage />} />
      <Route path="/signup" element={<TestPage />} />
      
    </Routes>
      
    </>
  )
}

export default App
