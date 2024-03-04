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

      if (res.data.message) {
       
        navigate(`/dashboard/onboarding`);
      } else if (res.data.error) {
        console.log(res.data.error);
        setError(res.data.error);
        setTimeout(() => {
          setError("");
        }, 3000);
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

              <div className="relative">
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

              <div className="relative">
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
// w-10/12 py-2 text-white text-lg font-bold mt-28




// <>
    //   <div
    //     className="bg-[image-url] bg-cover bg-center h-screen "
    //     style={{
    //         backgroundImage: `linear-gradient(to bottom, rgba(16, 24, 40, 0.5), rgba(16, 24, 40, 0.5)), url(${backgroundImage})`
    //       }}
    //   >
    //     <h1 className=" mx-auto w-4/12 pt-12 font-normal text-4xl px-0 text-white text-center leading-tight tracking-wider inknut-antiqua-regular">
    //       Welcome to the Applicant Portal
    //     </h1>

    //     <div className="bg-white w-3/12 mx-auto mt-10 py-6 px-6 border rounded-2xl">
    //       <form onSubmit={handleLogin}>
    //         <div className="mx-auto w-1/3">
    //           <img src={decagonLogo} alt="decagon logo" />
    //         </div>

    //         <div className="text-center text-lg my-4 font-bold">
    //           <h5>Login to the Applicant Portal</h5>
    //         </div>

    //         {error && (
    //           <div
    //             className="bg-red-100 border border-red-400 text-red-700 py-1 rounded my-2 relative text-center"
    //             role="alert"
    //           >
    //             <span className=" text-xs">{error}</span>
    //           </div>
    //         )}

    //         <div className="flex flex-col gap-2 mb-4">
    //           <div className="flex flex-col gap-1">
    //             <label htmlFor="email" className=" text-base">Email Address</label>
    //             <input
    //             onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
    //             value={email}
    //               className="border-2 rounded-lg border-gray-300 py-1 px-3 text-sm focus:border-green-700"
    //               id="email"
    //               type="text"
    //               placeholder="Enter your email"
    //             />
    //           </div>

    //           <div className="flex flex-col gap-1">
    //             <label htmlFor="password" className=" text-base">Password</label>
    //             <input
    //             onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
    //             value={password}
    //               className="border-2 rounded-lg border-gray-300 py-1 px-3 text-sm focus:border-green-700"
    //               id="password"
    //               type="password"
    //               placeholder="***************"
    //             />
    //           </div>

    //           <div className="text-right underline text-blue-600 text-sm">
    //             <Link to="/reset-password">Forgot password</Link>
    //           </div>
    //         </div>

    //         <div className="flex flex-col gap-6 mx-auto">
    //           <MainButton button_text={"Login"} />
    //           <div className="text-gray-400 w-2/3 mx-auto px-0 text-sm">
    //             No account ? <Link className="text-green-400 hover:underline" to="/register">Create One</Link>
    //           </div>
    //         </div>
    //       </form>
    //     </div>

    //     <footer className="w-full">
    //       <div className="flex justify-between mx-auto w-10/12 py-2 text-white text-lg font-bold mt-28 leading-8 tracking-wider">
    //         <div>
    //           <h5>Website Terms and Conditions</h5>
    //         </div>
    //         <div>
    //           <h5>Privacy Notice</h5>
    //         </div>
    //       </div>
    //     </footer>
    //   </div>
    // </>
