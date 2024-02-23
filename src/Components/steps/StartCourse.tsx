import { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";

export default function StartCourse() {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const gender = ["Male", "Female", "Other"];
  const country = [
    "Nigeria"
  ];
  const entryYear = [2024, 2025, 2026];
  const entryMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="flex flex-col h-screen">
      <div className="w-full mx-2 flex-1">
        <div className="font-inter text-2xl font-semibold leading-10 tracking-tighter text-center">
          Start your application
        </div>

        <p className="text-base font-normal leading-6 tracking-tighter text-center py-5">
          We need more information about you before we can begin processing your
          application. Some of them have been completed for you by us. Verify
          that the information on your passport or other travel document matches
          exactly.
        </p>

        <div className="flex flex-col items-center">
          <div className="flex flex-col w-full">
            <div> First Name</div>
            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
              <input
                onChange={handleChange}
                value={userData["firstname"] || ""}
                name="firstname"
                placeholder="Enter your first name"
                className="p-1 px-2 appearance-none outline-none w-full"
                type="text"
              />
            </div>

            <div> Last Name</div>
            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
              <input
                onChange={handleChange}
                value={userData["lastname"] || ""}
                name="lastname" // Corrected the name attribute to "lastname"
                placeholder="Enter your last name"
                className="p-1 px-2 appearance-none outline-none w-full"
                type="text"
              />
            </div>

            <div> Email Address</div>
            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
              <input
                onChange={handleChange}
                value={userData["email"] || ""}
                name="email" // Corrected the name attribute to "lastname"
                placeholder="Enter your email address"
                className="p-1 px-2 appearance-none outline-none w-full"
                type="text"
              />
            </div>
            <div> Phone Number</div>
            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
              <input
                onChange={handleChange}
                value={userData["phonenumber"] || ""}
                name="phone" // Corrected the name attribute to "lastname"
                placeholder="Enter your phone number"
                className="p-1 px-2 appearance-none outline-none w-full"
                type="text"
              />
            </div>

            <label htmlFor="gender">Gender</label>
            <select
              className="bg-white  my-2 p-1 flex border border-gray-200 rounded text-gray-500"
              name="gender"
              id="gender"
              value={userData.gender}
              onChange={handleChange}
            >
              <option value="">Enter gender</option>
              {gender.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <label htmlFor="country">Country</label>
            <select
              className="bg-white my-2 p-1 flex border border-gray-200 rounded text-gray-500"
              name="country"
              id="country"
              value={userData.country}
              onChange={handleChange}
            >
              <option value="">Enter your country</option>
              {country.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <label htmlFor="entryYear">Country of permanent residence</label>
            <select
              className="bg-white my-2 p-1 flex border border-gray-200 rounded text-gray-500"
              name="entryYear"
              id="entryYear"
              value={userData.entryYear}
              onChange={handleChange}
            >
              <option value="">Enter entry year</option>
              {entryYear.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <label htmlFor="entryMonth">Entry month</label>
            <select
              className="bg-white my-2 p-1 flex border border-gray-200 rounded text-gray-500"
              name="entryMonth"
              id="entryMonth"
              value={userData.entryMonth}
              onChange={handleChange}
            >
              <option value="">Enter entry month</option>
              {entryMonth.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {/* Repeat the same pattern for other select elements */}
          </div>
        </div>
      </div>
    </div>
  );
}
