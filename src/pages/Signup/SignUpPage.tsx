import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "/images/signup-background-image.jpeg";
import decagonLogo from "/images/decagon-logo.png";
import MainButton from "../../components/MainButton";
import "./SignUpPage.css";
import { ChangeEvent, FormEvent, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function SignUpPage() {
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryOfResidence, setCountryOfResidence] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !countryOfResidence
    ) {
      setError("All fields are required, please fill out all fields");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    console.log("sending request to server...");
    const res = await axiosInstance.post("/users/register", {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      countryOfResidence,
    });

    console.log("response", res);

    if (res.data.successfulSignup) {
      localStorage.setItem("name", firstName);
      navigate("/check-email");
    } else if (res.data.existingUserError) {
      setError(res.data.existingUserError);
      setfirstName("");
      setlastName("");
      setEmail("");
      setPassword("");
      setPhoneNumber("");
      setCountryOfResidence("");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <>
      <section
        className="bg-[image-url] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(16, 24, 40, 0.5), rgba(16, 24, 40, 0.5)), url(${backgroundImage})`,
        }}
      >
        <div className="mx-auto w-10/12 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-center text-2xl w-12/12 font-bold mx-auto md:w-10/12 xl:w-6/12 text-white sm:text-4xl lg:text-5xl lg:w-8/12  leading-tight tracking-wider inknut-antiqua-regular">
            Register to the Applicant Portal
          </h1>

          <div className="  bg-white mx-auto max-w-lg rounded-2xl w-10/12 sm:w-6/12  lg:w-6/12 xl:w-4/12 mt-8">
            <img
              className="mx-auto mt-4 pt-4 max-w-md"
              src={decagonLogo}
              alt="decagon logo"
            />

            <form
              onSubmit={handleSignup}
              className="mb-0  space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            >
              <p className="text-center text-lg font-medium">
                Create a new account
              </p>

              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 py-1 rounded my-2 relative text-center"
                  role="alert"
                >
                  <span className=" text-xs">{error}</span>
                </div>
              )}
              <div>
                <label htmlFor="firstName" className="">
                  First Name
                </label>

                <div className="relative mt-1">
                  <input
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setfirstName(e.target.value)
                    }
                    value={firstName}
                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-lg"
                    id="firstName"
                    type="text"
                    placeholder="Enter your full names"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="">
                  Last Name
                </label>

                <div className="relative mt-1">
                  <input
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setlastName(e.target.value)
                    }
                    value={lastName}
                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-lg"
                    id="lastName"
                    type="text"
                    placeholder="Enter your full names"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="">
                  Email Address
                </label>

                <div className="relative mt-1">
                  <input
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    value={email}
                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-lg"
                    id="email"
                    type="text"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
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

              <div>
                <label htmlFor="phoneNumber" className="">
                  Phone Number
                </label>
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPhoneNumber(e.target.value)
                  }
                  value={phoneNumber}
                  className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-lg"
                  id="phoneNumber"
                  type="text"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="country" className="">
                  Country of permanent residence
                </label>

                <div className="relative mt-1">
                  <input
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setCountryOfResidence(e.target.value)
                    }
                    value={countryOfResidence}
                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-lg"
                    id="country"
                    type="text"
                    placeholder="Nigeria"
                  />
                </div>
              </div>

              <MainButton button_text={"Sign Up"} />

              <p className="text-center text-sm text-gray-500">
                Already have an account ?{" "}
                <Link className="text-green-400 hover:underline" to="/">
                  Sign in here
                </Link>
              </p>
            </form>
          </div>

          <footer className="w-full text-white mt-12 leading-8 tracking-wider flex flex-col items-center lg:flex-row lg:items-center lg:justify-between">
            <h5>Website Terms and Conditions</h5>
            <h5>Privacy Notice</h5>
          </footer>
        </div>
      </section>
    </>
  );
}

export default SignUpPage;
