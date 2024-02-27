import { Routes, Route } from "react-router-dom";
import "./index.css";

// import TestPage from "./pages/TestPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUpPage from "./pages/Signup/SignUpPage";
import ResetPasswordForm from "./pages/ResetPassword/ResetPassword";
import NewPasswordForm from "./pages/ResetPassword/NewPassword";
import CheckEmail from "./pages/OtpVerification/CheckEmail";
import EmploymentDetails from "./pages/Application/EmploymentDetails";
import UploadPassport from "./pages/Application/UploadPassport";


function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/signup" element={<TestPage />} /> */}


        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/new-password/:token" element={<NewPasswordForm />} />
        <Route path="/dashboard/application/employment-details" element={<EmploymentDetails />} />
        <Route path="/dashboard/application/upload-passport" element={<UploadPassport />} />
 
        
      </Routes>
    </>
  );
}

export default App;
