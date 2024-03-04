import { Routes, Route } from "react-router-dom";
import "./index.css";

// import TestPage from "./pages/TestPage";
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
import Products from "./pages/ApplicantDashboard/Products";
import ApplicationView from "./pages/ApplictionView";
import EnglishQualification from "./pages/Application/EnglishQualification";
import Qualification from "./pages/Application/Qualifications";
import FundingInformation from "./pages/Application/FundingInformation";
import PersonalStatement from "./pages/Application/PersonalStatement";

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
        
        // Add a new route for the ApplicantDashboard component

        {/* Dashboard route, include sidebar links inside dashboard path */}

        
       
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<ApplicantDashboard />} />
          <Route path="/dashboard/products" element={<Products />} />
        </Route>

        {/*  */}


        <Route path="/onboarding" element={<ApplicationView />} />
        <Route path="/dashboard/application" element={<ApplicationPage />} /> 
        <Route
          path="/dashboard/application/personal-statement"
          element={<PersonalStatement />}
        />
        <Route
          path="/dashboard/application/employment-details"
          element={<EmploymentDetails />}
        />
        <Route
          path="/dashboard/application/academic-references"
          element={<AcademicReferences />}
        />
        <Route
          path="/dashboard/application/employment-details"
          element={<EmploymentDetails />}
        />
        <Route
          path="/dashboard/application/disability-details"
          element={<DisabilityDetails />}
        />
        <Route path="/dashboard/application" element={<ApplicationPage />} />
        <Route
          path="/dashboard/application/upload-passport"
          element={<UploadPassport />}
        />
        <Route
          path="/dashboard/application/personal-statement"
          element={<PersonalStatement />}
        />
        <Route
          path="/dashboard/application/disability-details"
          element={<DisabilityDetails />}
        />
        <Route
          path="/dashboard/application/upload-passport"
          element={<UploadPassport />}
        />
        <Route
          path="/dashboard/application/english-qualification"
          element={<EnglishQualification />}
        />
        <Route
          path="/dashboard/application/qualifications"
          element={<Qualification />}
        />
        <Route
          path="/dashboard/application/funding-information"
          element={<FundingInformation />}
        />
      </Routes>
    </>
  );
}

export default App;
