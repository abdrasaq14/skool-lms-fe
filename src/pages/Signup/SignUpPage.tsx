import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "/images/signup-background-image.jpeg";
import decagonLogo from "/images/decagon-logo.png";
import MainButton from "../../components/MainButton";
import "./SignUpPage.css";
import { ChangeEvent, FormEvent, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

interface validationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  countryOfResidence?: string;
}

function SignUpPage() {
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryOfResidence, setCountryOfResidence] = useState("");
  const [genericError, setGenericError] = useState("");
  const [validationErrors, setValidationErrors] = useState<validationErrors>(
    {}
  );

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors: validationErrors = {};

    if (!firstName.trim()) {
      validationErrors["firstName"] = "First Name is required";
    }

    if (!lastName.trim()) {
      validationErrors["lastName"] = "Last Name is required";
    }

    if (!email.trim()) {
      validationErrors["email"] = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors["email"] = "Email is invalid";
    }

    if (!password.trim()) {
      validationErrors["password"] = "Password is required";
    } else if (password.trim().length < 6) {
      validationErrors["password"] = "Password must be at least 6 characters";
    }

    if (!phoneNumber.trim()) {
      validationErrors["phoneNumber"] = "Phone Number is required";
    }

    if (!countryOfResidence.trim()) {
      validationErrors["countryOfResidence"] =
        "Country of Residence is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors as validationErrors);
      return;
    }
    // if (
    //   !firstName ||
    //   !lastName ||
    //   !email ||
    //   !phoneNumber ||
    //   !countryOfResidence
    // ) {
    //   setError("All fields are required, please fill out all fields");
    //   setTimeout(() => {
    //     setError("");
    //   }, 3000);
    //   return;
    // }
    try {
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
        setGenericError(res.data.existingUserError);
        setfirstName("");
        setlastName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        setCountryOfResidence("");
      }
    } catch (error) {
      setGenericError(`${error}`);
    } finally {
      setValidationErrors({});
    }
  };

  return (
    <>
      <div
        className="bg-[image-url] bg-cover bg-center h-full w-full min-h-screen"
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

            <div className="text-center text-lg my-1 font-bold">
              <h5>Create a new account</h5>
            </div>

            {genericError && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 py-1 rounded my-2 relative text-center"
                role="alert"
              >
                <span className=" text-xs">{genericError}</span>
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
                {validationErrors?.firstName && (
                  <span className="text-red-500 text-sm ml-1">
                    {validationErrors.firstName}
                  </span>
                )}
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
                {validationErrors?.lastName && (
                  <span className="text-red-500 text-sm ml-1">
                    {validationErrors.lastName}
                  </span>
                )}
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
                {validationErrors?.email && (
                  <span className="text-red-500 text-sm ml-1">
                    {validationErrors.email}
                  </span>
                )}
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
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
                {validationErrors?.password && (
                  <span className="text-red-500 text-sm  ml-1">
                    {validationErrors.password}
                  </span>
                )}
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
                {validationErrors?.phoneNumber && (
                  <span className="text-red-500 text-sm ml-1">
                    {validationErrors.phoneNumber}
                  </span>
                )}
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
                {validationErrors?.countryOfResidence && (
                  <span className="text-red-500 text-sm ml-1">
                    {validationErrors.countryOfResidence}
                  </span>
                )}
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

        <footer className="w-full ">
          <div className="flex justify-between mx-auto w-10/12 pt-2 text-white text-lg font-bold mt-1 leading-8 tracking-wider">
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
