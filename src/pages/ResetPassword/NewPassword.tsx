import backgroundImage from "/images/signup-background-image.jpeg";
import decagonLogo from "/images/decagon-logo.png";
import { ChangeEvent, useState, FormEvent } from "react";
import MainButton from "../../components/MainButton";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

interface validationErrors {
  password?: string;
  confirmPassword?: string;
}

const NewPasswordForm = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [genericError, setGenericError] = useState("");
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<validationErrors>(
    {}
  );

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors: validationErrors = {};
    if (!password.trim()) {
      validationErrors["password"] = "Password is required";
    } else if (password.trim().length < 6) {
      validationErrors["password"] = "Password must be at least 6 characters";
    }

    if (!confirmPassword.trim()) {
      validationErrors["confirmPassword"] = "Confirm Password is required";
    } else if (confirmPassword.trim().length < 6) {
      validationErrors["confirmPassword"] =
        "Password must be at least 6 characters";
    }

    if(password.length && confirmPassword.length && password !== confirmPassword) {
      validationErrors["confirmPassword"] = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors as validationErrors);
      return;
    }

    try {
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
        setGenericError(res.data.error);
      }
    } catch (error) {
      setGenericError(`${error}`);
    } finally {
      setValidationErrors({});
      setGenericError("");
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

            {genericError && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 py-1 rounded my-2 relative text-center"
                role="alert"
              >
                <span className=" text-xs">{genericError}</span>
              </div>
            )}

            {success && (
              <div>
                <div
                  className="bg-green-100 border border-green-400 text-green-700 py-1 rounded my-2 relative text-center"
                  role="alert"
                >
                  <span className=" text-xs">
                    Password reset successfull..redirecting to login in 5
                    seconds
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 mb-1">
              <div className="flex flex-col gap-1 mb-1">
                <label htmlFor="email" className=" text-base">
                  Password
                </label>
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  value={password}
                  className="border-2 rounded-lg border-gray-300 py-1 px-3 text-sm focus:border-green-700"
                  type="password"
                  placeholder="Enter your password"
                />
                {validationErrors.password && (
                  <span className="text-red-500 text-sm ml-1">
                    {validationErrors.password}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 mb-6">
                <label htmlFor="password" className=" text-base">
                  Confirm Password
                </label>
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setConfirmPassword(e.target.value)
                  }
                  value={confirmPassword}
                  className="border-2 rounded-lg border-gray-300 py-1 px-3 text-sm focus:border-green-700"
                  type="password"
                  placeholder="Confirm your password"
                />
                {validationErrors.confirmPassword && (
                  <span className="text-red-500 text-sm ml-1">
                    {validationErrors.confirmPassword}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-6">
                <MainButton button_text={"Reset Password"} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewPasswordForm;
