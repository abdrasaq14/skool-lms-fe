import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import socket from "../socket";
import "./index.css";
import io from 'socket.io-client';

// import TestPage from "./pages/TestPage";
import HeroPage from "./pages/HeroPage/HeroPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUpPage from "./pages/Signup/SignUpPage";
import ResetPasswordForm from "./pages/ResetPassword/ResetPassword";
import NewPasswordForm from "./pages/ResetPassword/NewPassword";
import CheckEmail from "./pages/OtpVerification/CheckEmail";
import EmploymentDetails from "./pages/Application/EmploymentDetails";
import DisabilityDetails from "./pages/Application/DisabilityDetails";
import ApplicationPage from "./pages/ApplicationPage/ApplicationPage";
import AcademicReferences from "./pages/Application/AcademicReferences";
import UploadPassport from "./pages/Application/UploadPassport";

//Applicant dashboard routes
import ApplicantDashboard from "./pages/ApplicantDashboard/Dashboard";
import Layout from "./components/ApplicantDashboardComponents/shared/Layout";
import ApplicationView from "./pages/ApplictionView";
import EnglishQualification from "./pages/Application/EnglishQualification";
import Qualification from "./pages/Application/Qualifications";
import FundingInformation from "./pages/Application/FundingInformation";
import PersonalStatement from "./pages/Application/PersonalStatement";
import Settings from "./pages/ApplicantDashboard/Settings";
import Profile from "./pages/ApplicantDashboard/Profile";
import NotificationPage from "./pages/ApplicantDashboard/Notifications";

//Admin dashboard routes
import ApplicationStatesPage from "./pages/ApplicationStatesPage/ApplicationStatesPage";
import ApplicationViewPage from "./pages/ApplicationViewPage/ApplicationViewPage";

import { ProtectedRoute } from "./components/protectedRoutes/ProtectedRoute";
import AdminMessageView from "./pages/Messages/AdminMessageView";
import UserMessageView from "./pages/Messages/UserMessageView";
import ChatInput from "./pages/Messages/UserMessages";

function App() {
  useEffect(() => {
    // Test WebSocket connection
    const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL);

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      console.log(socket)
    })
  
    return () => {
      socket.disconnect(); // Clean up WebSocket connection
    };
  }, []);
  return (
    <>
      <Routes>
        {/* <Route path="/signup" element={<TestPage />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HeroPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/new-password/:token" element={<NewPasswordForm />} />
        
        

        {/* Protected Routes after logging - Dashboard related routes. */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Routes>
                {/* Dashboard route, include sidebar links inside dashboard path */}
                <Route element={<Layout />}>
                  <Route index element={<ApplicantDashboard />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="notifications" element={<NotificationPage />} />
                  <Route path="messages/chats" element={<ChatInput />} />
                </Route>

                {/*  */}

                <Route path="onboarding" element={<ApplicationView />} />
                <Route path="application" element={<ApplicationPage />} />
                <Route path="messages" element={<UserMessageView />} />
                
                

                <Route
                  path="application/personal-statement"
                  element={<PersonalStatement />}
                />
                <Route
                  path="application/employment-details"
                  element={<EmploymentDetails />}
                />
                <Route
                  path="application/academic-references"
                  element={<AcademicReferences />}
                />

                <Route
                  path="application/disability-details"
                  element={<DisabilityDetails />}
                />

                <Route
                  path="application/upload-passport"
                  element={<UploadPassport />}
                />

                <Route
                  path="application/english-qualification"
                  element={<EnglishQualification />}
                />
                <Route
                  path="application/qualifications"
                  element={<Qualification />}
                />
                <Route
                  path="application/funding-information"
                  element={<FundingInformation />}
                />


              </Routes>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route
                  path="applications-section"
                  element={<ApplicationStatesPage />}
                />

                <Route
                  path="dashboard/application-view/:id"
                  element={<ApplicationViewPage />}
                />

                <Route
                  path="/messages"
                  element={<AdminMessageView />}
                />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
