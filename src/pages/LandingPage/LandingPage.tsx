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
            console.log(email, password)

            const res = await axiosInstance.post("/users/login", {
                email: email,
                password: password

            }
            )
            console.log(res)

            if(res.data.message){
                navigate(`/dashboard`);
            }
            else if(res.data.error){
                setError(res.data.error)
                setTimeout(() => {
                  setError("");
                }, 3000);
                return
            }
            
          } catch (error) {
            setError(`${error}`);
            console.log(error)
            
          }
        
    }

  return (
    <>
      <div
        className="bg-[image-url] bg-cover bg-center h-screen "
        style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(16, 24, 40, 0.5), rgba(16, 24, 40, 0.5)), url(${backgroundImage})`
          }}
      >
        <h1 className=" mx-auto w-4/12 pt-12 font-normal text-4xl px-0 text-white text-center leading-tight tracking-wider inknut-antiqua-regular">
          Welcome to the Applicant Portal
        </h1>

        <div className="bg-white w-3/12 mx-auto mt-10 py-6 px-6 border rounded-2xl">
          <form onSubmit={handleLogin}>
            <div className="mx-auto w-1/3">
              <img src={decagonLogo} alt="decagon logo" />
            </div>

            <div className="text-center text-lg my-4 font-bold">
              <h5>Login to the Applicant Portal</h5>
            </div>

            {error && (
                <div className="text-center w-full mx-auto text-red-500 mb-4 text-sm">{error}</div>
            )}

            <div className="flex flex-col gap-2 mb-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className=" text-base">Email Address</label>
                <input
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                value={email}
                  className="border-2 rounded-lg border-gray-300 py-1 px-3 text-sm focus:border-green-700"
                  id="email"
                  type="text"
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password" className=" text-base">Password</label>
                <input
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                value={password}
                  className="border-2 rounded-lg border-gray-300 py-1 px-3 text-sm focus:border-green-700"
                  id="password"
                  type="password"
                  placeholder="***************"
                />
              </div>

              <div className="text-right underline text-blue-600 text-sm">
                <Link to="/reset-password">Forgot password</Link>
              </div>
            </div>

            <div className="flex flex-col gap-6 mx-auto">
              <MainButton button_text={"Login"} />
              <div className="text-gray-400 w-2/3 mx-auto px-0 text-sm">
                No account ? <Link className="text-green-400 hover:underline" to="/register">Create One</Link>
              </div>
            </div>
          </form>
        </div>

        <footer className="w-full">
          <div className="flex justify-between mx-auto w-10/12 py-2 text-white text-lg font-bold mt-28 leading-8 tracking-wider">
            <div>
              <h5>Website Terms and Conditions</h5>
            </div>
            <div>
              <h5>Privacy Notice</h5>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default LandingPage;
