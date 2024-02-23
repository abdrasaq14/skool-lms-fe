import backgroundImage from "/images/signup-background-image.jpeg";
import decagonLogo from "/images/decagon-logo.png";
import { ChangeEvent, useState, FormEvent } from "react";
import MainButton from "../../components/MainButton";
import axios from "axios";
import { Link } from "react-router-dom";

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    const res = await axios.post("http://localhost:3000/users/forgotpassword", {
      email,
    });
    console.log(res.data.successMessage);
    if(res.data.successMessage){
        
    }
  };
  return (
    <>
      <div
        className="bg-[image-url] bg-cover bg-center h-screen "
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(16, 24, 40, 0.5), rgba(16, 24, 40, 0.5)), url(${backgroundImage})`,
        }}
      >
        <h1 className=" mx-auto w-80 md:w-96 lg:w-96 pt-12 font-normal text-4xl px-0 text-white text-center leading-tight tracking-wider inknut-antiqua-regular">
          Welcome to the Applicant Portal
        </h1>
        <div className="bg-white w-80 md:w-80 lg:w-96 mx-auto mt-10 py-6 px-6 border rounded-2xl">
          <form onSubmit={handleResetPassword}>
            <div className="mx-auto w-1/3">
              <img src={decagonLogo} alt="decagon logo" />
            </div>
            <div className="text-center text-lg my-4 font-bold">
              <h5>Reset your password</h5>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <div className="text-center text-xs text-gray-400 mb-4">
                {error && (
                  <div className="text-center w-full mx-auto text-red-500 mb-4 text-sm">
                    {error}
                  </div>
                )}
                <p>
                  Enter your email below and we'll send you instructions on how
                  to reset your password
                </p>
              </div>
              <div className="flex flex-col gap-1 mb-6">
                <label htmlFor="email" className=" text-base">
                  Email Address
                </label>
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  value={email}
                  className="border-2 rounded-lg border-gray-300 py-1 px-3 text-sm focus:border-green-700"
                  id="email"
                  type="text"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col gap-6">
                <MainButton button_text={"Send reset instructions"} />
                <div className="text-gray-400  text-center px-0 text-sm">
                  Go back to{" "}
                  <Link className="text-green-400" to="/">
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmailForm;