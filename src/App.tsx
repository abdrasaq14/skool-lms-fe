<<<<<<< HEAD
// App.tsx file
import ApplicationView from "./Components/ApplicationView";

function App() {
  return (
    <div>
      <ApplicationView />
    </div>
=======
import { Routes, Route } from "react-router-dom";
import "./index.css";

// import TestPage from "./pages/TestPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUpPage from "./pages/Signup/SignUpPage";
import ResetPasswordForm from "./pages/ResetPassword/ResetPassword";
import NewPasswordForm from "./pages/ResetPassword/NewPassword";
import CheckEmail from "./pages/OtpVerification/CheckEmail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/signup" element={<TestPage />} /> */}
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/new-password/:token" element={<NewPasswordForm />} />
        
      </Routes>
    </>
>>>>>>> 1c330c0b411875365b6cfd59207551a2f5a8a226
  );
}

export default App;
