import backgroundImage from "/images/signup-background-image.jpeg";
import decagonLogo from "/images/decagon-logo.png";
import { ChangeEvent, useState, FormEvent } from "react";
import MainButton from "../../components/MainButton";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const NewPasswordForm = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to track confirm password visibility

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError("All fields are required, try again");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }
    const res = await axiosInstance.post(`/users/forgotpassword/${token}`, {
      password,
      token,
    });
    if (res.data.successMessage) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else if (res.data.error) {
      setError(res.data.error);
      setTimeout(() => {
        setError("");
      }, 3000);
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
        <h1 className=" mx-auto w-80 md:w-96 lg:w-3/12 pt-12 font-normal text-4xl px-0 text-white text-center leading-tight tracking-wider inknut-antiqua-regular">
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

            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 py-1 rounded my-2 relative text-center"
                role="alert"
              >
                <span className=" text-xs">{error}</span>
              </div>
            )}

            {success && (
              <div>
                <div
                  className="bg-green-100 border border-green-400 text-green-700 py-1 rounded my-2 relative text-center"
                  role="alert"
                >
                  <span className=" text-xs">
                    Password reset successful..redirecting to login in 5 seconds
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 mb-1">
              <label htmlFor="password" className="">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  value={password}
                  type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                  className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-lg"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-4 py-3 flex items-center focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state on button click
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 8h16M4 16h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1 mb-6">
              <label htmlFor="password" className="text-base">
                Confirm Password
              </label>
              <div className="relative mt-1">
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setConfirmPassword(e.target.value)
                  }
                  value={confirmPassword}
                  className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-lg"
                  type={showConfirmPassword ? "text" : "password"} // Toggle input type based on showConfirmPassword state
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-4 py-3 flex items-center focus:outline-none"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle showConfirmPassword state on button click
                >
                  {showConfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 8h16M4 16h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <MainButton button_text={"Reset Password"} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewPasswordForm;
