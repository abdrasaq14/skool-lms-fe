import { Routes, Route } from "react-router-dom";
import "./index.css";

// import TestPage from "./pages/TestPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUpPage from "./pages/Signup/SignUpPage";
import CheckEmail from "./pages/OtpVerification/CheckEmail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/signup" element={<TestPage />} /> */}
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/check-email" element={<CheckEmail />} />
      </Routes>
    </>
  );
}

export default App;
