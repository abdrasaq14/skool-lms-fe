import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "/images/signup-background-image.jpeg";
import decagonLogo from "/images/decagon-logo.png";
import MainButton from "../../components/MainButton";
import "./LandingPage.css";
import { ChangeEvent, FormEvent, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";



function LandingPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();


    if (!email || !password) {
      setError("All fields are required, try again");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    try {
      console.log(email, password);

      const res = await axiosInstance.post("/users/login", {
        email: email,
        password: password,
      });
      console.log(res);

      if (res.data.userNotOnboarded) {
        localStorage.setItem("token", res.data.token);
        navigate(`/dashboard/onboarding`);
      }
      else if(res.data.userOnboarded){
        localStorage.setItem("token", res.data.token);
        navigate(`/dashboard`);
      }
      else if(res.data.adminSuccessMessage){
        localStorage.setItem("token", res.data.token);
        navigate(`admin/applications-section`)
      }
      
      else if (res.data.error) {
        setError(res.data.error);
        setTimeout(() => {
          setError("");
        }, 3000);
        setEmail("");
        setPassword("");
        return;
      }
    } catch (error) {
      setError(`${error}`);
      console.log(error);
    }
  };

  return (
    
    <section
      className="bg-[image-url] bg-cover bg-center min-h-screen "
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(16, 24, 40, 0.5), rgba(16, 24, 40, 0.5)), url(${backgroundImage})`,
      }}
    >
      <div className="mx-auto w-10/12 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-center text-2xl w-12/12 font-bold mx-auto md:w-10/12 xl:w-6/12 text-white sm:text-4xl lg:text-5xl lg:w-8/12  leading-tight tracking-wider inknut-antiqua-regular">
          Welcome to the Applicant Portal
        </h1>
        <div className="  bg-white mx-auto max-w-lg rounded-2xl w-10/12 sm:w-6/12  lg:w-6/12 xl:w-4/12 mt-8">
          <img
            className="mx-auto mt-4 pt-4 max-w-md"
            src={decagonLogo}
            alt="decagon logo"
          />

          <form
            onSubmit={handleLogin}
            className="mb-0  space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              Login in to the Applicant Portal
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
              <label htmlFor="email" className="">
                Email Address
              </label>

              <div className="relative mt-1">
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  value={email}
                  type="email"
                  className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-lg"
                  placeholder="Enter your email"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
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
                  type="password"
                  className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-lg"
                  placeholder="Enter your password"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
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
                </span>
              </div>
            </div>
            <p className="text-right text-sm font-medium underline text-blue-600">
              <Link to="/reset-password">Forgot password</Link>
            </p>
            {/* <button
        type="submit"
        className="block w-full rounded-lg bg-green-600 hover:bg-green-400 px-5 py-3 text-sm font-medium text-white"
      >
        Login
      </button> */}

            <MainButton button_text={"Login"} />

            <p className="text-center text-sm text-gray-500">
              No account ?
              <Link className="text-green-400 hover:underline" to="/register">
                {" "}
                Create One
              </Link>
            </p>
          </form>
        </div>
        <footer className="w-full text-white mt-12 leading-8 tracking-wider flex flex-col items-center lg:flex-row lg:items-center lg:justify-between">
          <h5>Website Terms and Conditions</h5>
          <h5>Privacy Notice </h5>
        </footer>
      </div>
    </section>
  );
}

export default LandingPage;
