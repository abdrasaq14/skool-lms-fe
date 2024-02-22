import { Routes, Route } from "react-router-dom";
import './index.css'

// import TestPage from "./pages/TestPage";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/signup" element={<TestPage />} /> */}
      
    </Routes>
      
    </>
  )
}

export default App
