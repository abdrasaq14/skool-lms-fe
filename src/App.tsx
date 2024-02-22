import { Routes, Route } from "react-router-dom";
import "./index.css";

// import TestPage from "./pages/TestPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUpPage from "./pages/Signup/SignUpPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/signup" element={<TestPage />} /> */}
        <Route path="/register" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
