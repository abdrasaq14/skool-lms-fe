import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "/images/signup-background-image.jpeg";
import decagonLogo from "/images/decagon-logo.png";
import MainButton from "../../components/MainButton";
import "./SignUpPage.css";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

function SignUpPage() {
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryOfResidence, setCountryOfResidence] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phoneNumber || !countryOfResidence) {
      setError("All fields are required, please fill out all fields");
      return;
    }
    console.log("sending request to server...")
      const res = await axios.post("http://localhost:3000/users/register", {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        countryOfResidence,
      });

      console.log("response", res);

      if (res.data.successfulSignup ) {
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

      }
  };

  return (
    <>
      <div
        className="bg-[image-url] bg-cover bg-center h-screen"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(16, 24, 40, 0.5), rgba(16, 24, 40, 0.5)), url(${backgroundImage})`,
        }}
      >
        <h1 className=" mx-auto w-4/12 pt-6 font-normal text-4xl px-0 text-white text-center leading-tight tracking-wider inknut-antiqua-regular">
          Register to the Applicant Portal
        </h1>

        <div className="bg-white w-3/12 mx-auto mt-4 py-4 px-6 border rounded-2xl">
          <form onSubmit={handleSignup}>
            <div className="mx-auto w-1/3">
              <img src={decagonLogo} alt="decagon logo" />
            </div>

            <div className="text-center text-lg my-2 font-bold">
              <h5>Create a new account</h5>
            </div>

            {error && (
              <div className="text-center w-full mx-auto text-red-500 mb-4 text-sm">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2 mb-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="firstName" className=" text-sm">
                  First Name
                </label>
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setfirstName(e.target.value)
                  }
                  value={firstName}
                  className="border-2 rounded-lg border-gray-300 py-1 px-3 text-sm focus:border-green-700"
                  id="firstName"
                  type="text"
                  placeholder="Enter your full names"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lastName" className=" text-sm">
                  Last Name
                </label>
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setlastName(e.target.value)
                  }
                  value={lastName}
                  className="border-2 rounded-lg border-gray-300 py-1 px-3 text-sm focus:border-green-700"
                  id="lastName"
                  type="text"
                  placeholder="Enter your full names"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className=" text-sm">
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
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className=" text-sm">
                  Password
                </label>
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  value={password}
                  className="border-2 rounded-lg border-gray-300 py-1 px-3 text-sm focus:border-green-700"
                  id="email"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="phoneNumber" className=" text-sm">
                  Phone Number
                </label>
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPhoneNumber(e.target.value)
                  }
                  value={phoneNumber}
                  className="border-2 rounded-lg border-gray-300 py-1 px-3 text-sm focus:border-green-700"
                  id="phoneNumber"
                  type="text"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="country" className=" text-sm">
                  Country of permanent residence
                </label>
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setCountryOfResidence(e.target.value)
                  }
                  value={countryOfResidence}
                  className="border-2 rounded-lg border-gray-300 py-1 px-3 text-sm focus:border-green-700"
                  id="country"
                  type="text"
                  placeholder="Nigeria"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 mx-auto">
              <MainButton button_text={"Sign Up"} />
              <div className="text-gray-400 w-3/3 mx-auto px-0 text-sm">
                Already have an account ?{" "}
                <Link className="text-green-400 hover:underline" to="/">
                  Sign in here
                </Link>
              </div>
            </div>
          </form>
        </div>

        <footer className="w-full">
          <div className="flex justify-between mx-auto w-10/12 pt-2 text-white text-lg font-bold mt-2 leading-8 tracking-wider">
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

export default SignUpPage;
