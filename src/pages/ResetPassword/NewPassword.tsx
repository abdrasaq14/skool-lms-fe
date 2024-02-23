import backgroundImage from "/images/signup-background-image.jpeg";
import decagonLogo from "/images/decagon-logo.png";
import { ChangeEvent, useState, FormEvent } from "react";
import MainButton from "../../components/MainButton";
import axios from "axios";


const NewPasswordForm = () => {
  const [ password, setPassword] = useState("");
  const [ confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("");

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError("All fields are required, try again");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    if(password !== confirmPassword){
        setError("Passwords do not match");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
    }
    const res = await axios.post("http://localhost:3000/users/login", {
      password,
      confirmPassword
    });
    console.log(res);
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
            <div className="flex flex-col gap-2 mb-1">
              <div className="text-center text-xs text-gray-400 ">
                {error && (
                  <div className="text-center w-full mx-auto text-red-500 text-sm">
                    {error}
                  </div>
                )}
              </div>
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

export default NewPasswordForm ;
