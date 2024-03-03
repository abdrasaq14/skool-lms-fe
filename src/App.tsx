import { Routes, Route } from 'react-router-dom'
import './index.css'

// import TestPage from "./pages/TestPage";
import LandingPage from './pages/LandingPage/LandingPage'
import SignUpPage from './pages/Signup/SignUpPage'
import ResetPasswordForm from './pages/ResetPassword/ResetPassword'
import NewPasswordForm from './pages/ResetPassword/NewPassword'
import CheckEmail from './pages/OtpVerification/CheckEmail'
import EmploymentDetails from './pages/Application/EmploymentDetails'
import DisabilityDetails from "./pages/Application/DisabilityDetails";
import ApplicationPage from './pages/ApplicationPage/ApplicationPage'
import AcademicReferences from './pages/Application/AcademicReferences'
import UploadPassport from './pages/Application/UploadPassport'
//Applicant dashboard routes
import ApplicantDashboard from './pages/ApplicantDashboard/Dashboard'
import Layout from './components/ApplicantDashboardComponents/shared/Layout'
import Register from './pages/ApplicantDashboard/Register'
import Dashboard from './pages/ApplicantDashboard/Dashboard'
import Products from './pages/ApplicantDashboard/Products'import ApplicationView from "./pages/ApplictionView";
import EnglishQualification from "./pages/Application/EnglishLang";
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
                <Route path="/dashboard/application/employment-details" element={<EmploymentDetails />} />
                <Route path="/dashboard/application/academic-references" element={<AcademicReferences />} />
                <Route path="/dashboard/application/employment-details" element={<EmploymentDetails />} />
                <Route path="/dashboard/application" element={<ApplicationPage />} />
                <Route path="/dashboard/application/upload-passport" element={<UploadPassport />} />
                // Add a new route for the ApplicantDashboard component
                <Route path="/dashboard/application/ApplicantDashboard" element={<ApplicantDashboard />} />
                <Route path="/ApplicantDashboard" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                </Route>
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    )
}

export default App
