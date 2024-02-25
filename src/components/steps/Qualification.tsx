import { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";

export default function Qualification() {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

const qualificationType = ["Masters", "B.Sc",]
  const country = ["Nigeria"];

  return (
    <div className="flex flex-col h-screen">
      <div className="w-full mx-2 flex-1">
        <div className="font-inter text-2xl font-semibold leading-10 tracking-tighter text-center">
          Upload your highest qualifications
        </div>

        <p className="text-base font-normal leading-6 tracking-tighter text-center py-5">
          For each course you are applying to, we only require your greatest
          degree. You will have the option to upload additional qualifications
          at a later stage of the process, should they be relevant.
        </p>

        <div className="flex flex-col items-center">
          <div className="flex flex-col w-full">
            <div> Institution Name</div>
            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
              <input
                onChange={handleChange}
                value={userData["institution"] || ""}
                name="firstname"
                placeholder="Institution Name"
                className="p-1 px-2 appearance-none outline-none w-full"
                type="text"
              />
            </div>

            <div> Field/Area of Study</div>
            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
              <input
                onChange={handleChange}
                value={userData["lastname"] || ""}
                name="field" // Corrected the name attribute to "lastname"
                placeholder="Field/Area of Study"
                className="p-1 px-2 appearance-none outline-none w-full"
                type="text"
              />
            </div>

            <div> Year of Graduation</div>
            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
              <input
                onChange={handleChange}
                value={userData["graduation-year"] || ""}
                name="email" // Corrected the name attribute to "lastname"
                placeholder="2023"
                className="p-1 px-2 appearance-none outline-none w-full"
                type="text"
              />
            </div>
            <div> Grade or CGPA</div>
            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
              <input
                onChange={handleChange}
                value={userData["cgpa"] || ""}
                name="phone" // Corrected the name attribute to "lastname"
                placeholder="3.06"
                className="p-1 px-2 appearance-none outline-none w-full"
                type="text"
              />
            </div>

            <label htmlFor="qualification-type">Qualification type</label>
            <select
              className="bg-white  my-2 p-1 flex border border-gray-200 rounded text-gray-500"
              name="qualification-type"
              id="qualification-type"
              value={userData.qualificationType}
              onChange={handleChange}
            >
              <option value=""></option>
              {qualificationType.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <label htmlFor="country">Country of birth</label>
            <select
              className="bg-white my-2 p-1 flex border border-gray-200 rounded text-gray-500"
              name="country"
              id="country"
              value={userData.country}
              onChange={handleChange}
            >
              <option value="">Enter your country of birth</option>
              {country.map((type, index) => (
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
