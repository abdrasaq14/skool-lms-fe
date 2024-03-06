import MainButton from "../../components/MainButton";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { login } from "../../states/userDetails/userDetailsSlice";

function Profile() {
  const user = useSelector((state: RootState) => state.userDetails);

  const [phoneNumber, setPhoneNumber] = useState(user.phone);
  const [country, setCountry] = useState(user.country);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (user !== null) {
      setPhoneNumber(user.phone);
      setCountry(user.country);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.put("/users/edit-profile", {
        phoneNumber: phoneNumber,
        countryOfResidence: country,
      });

      if (res.data.noTokenError) {
        setErrorMessage(res.data.noTokenError);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else if (res.data.userNotFoundError) {
        setErrorMessage(res.data.userNotFoundError);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else if (res.data.successMessage) {
        const updatedUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: phoneNumber,
          country: country,
        };

        dispatch(login(updatedUser));

        setSuccessMessage(res.data.successMessage);
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div>
      <div className=" w-5/12 mx-auto py-6 bg-gray-200 rounded-xl">
        <h1 className="text-center text-[1.5rem] mb-8">My Profile</h1>

        <div>
          <form
            onSubmit={handleSubmit}
            className=" w-10/12 mx-auto flex flex-col gap-6 py-6 px-4 bg-white rounded-lg"
            action=""
          >
            {errorMessage && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 py-1 rounded my-1 relative text-center"
                role="alert"
              >
                <span className=" text-xs">{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div>
                <div
                  className="bg-green-100 border border-green-400 text-green-700 py-1 rounded my-1 relative text-center"
                  role="alert"
                >
                  <span className=" text-xs">{successMessage}</span>
                </div>
              </div>
            )}

            <div className="flex gap-4 items-center w-10/12 mx-auto">
              <label className="w-6/12" htmlFor="firstName">
                First Name
              </label>
              <input
                className=" border rounded-lg py-1 px-2 bg-gray-200"
                type="text"
                id="firstName"
                value={user.firstName}
                readOnly
              />
            </div>

            <div className="flex gap-4 items-center w-10/12 mx-auto">
              <label className="w-6/12" htmlFor="lastName">
                Last Name
              </label>
              <input
                className=" border rounded-lg py-1 px-2 bg-gray-200"
                type="text"
                id="lastName"
                value={user.lastName}
                readOnly
              />
            </div>

            <div className="flex gap-4  items-center w-10/12 mx-auto ">
              <label className=" w-6/12" htmlFor="email">
                Email
              </label>
              <input
                className=" border rounded-lg py-1 px-2 bg-gray-200"
                type="email"
                id="email"
                value={user.email}
                readOnly
              />
            </div>

            <div className="flex gap-4 items-center w-10/12 mx-auto">
              <label className=" flex-wrap w-6/12" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                className=" border rounded-lg py-1 px-2"
                type="text"
                id="phoneNumber"
                value={phoneNumber}
              />
            </div>

            <div className="flex gap-4 items-center w-10/12 mx-auto">
              <label className=" flex-wrap w-6/12" htmlFor="countryofResidence">
                Country
              </label>
              <input
                onChange={(e) => setCountry(e.target.value)}
                className=" border rounded-lg py-1 px-2"
                type="text"
                id="countryofResidence"
                value={country}
              />
            </div>

            <div>
              <MainButton button_text="Save" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
