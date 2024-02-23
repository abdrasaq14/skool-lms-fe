import { Routes, Route } from "react-router-dom";
import "./index.css";

// import TestPage from "./pages/TestPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUpPage from "./pages/Signup/SignUpPage";
import EmailForm from "./pages/ResetPassword/Email";
import NewPasswordForm from "./pages/ResetPassword/NewPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/signup" element={<TestPage />} /> */}
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/reset-password" element={<EmailForm />} />
        <Route path="/new-password" element={<NewPasswordForm />} />
      </Routes>
    </>
  );
}

export default App;
