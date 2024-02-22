import backgroundImage from "assets/pexels-curtis-adams-16501687.jpg";
import { SignupForm } from "./SignupForm";

const SignupPage = () => {
  return (
    <div
      className="w-full h-full bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1>Register to the Applicant Portal</h1>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
