
import { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";

export default function FindCourse() {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const courseType = ["Undergraduate degree", "Postgraduate degree", "Others"];
  const studyMode = ["Full time", "Part time"];
  const courseSearch = [
    "Accounting",
    "Biology",
    "Computer Science",
    "Economics",
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
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="font-inter text-2xl font-semibold leading-10 tracking-tighter text-center">
          Find your course
        </div>

        <p className="text-base font-normal leading-6 tracking-tighter text-center py-5">
          Enter your chosen course. We'll help you find the one that's right for
          you
        </p>

        <div className="flex flex-col items-center">
          <div className="flex flex-col w-full">
            <label htmlFor="courseType">Course type</label>
            <select
              className="bg-white my-2 p-1 flex border border-gray-200 rounded text-gray-500" // Add text-gray-500 class here
              name="courseType"
              id="courseType"
              value={userData.courseType}
              onChange={handleChange}
            >
              <option value="">Enter your course type</option>
              {courseType.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <label htmlFor="studyMode">Study mode</label>
            <select
              className="bg-white  my-2 p-1 flex border border-gray-200 rounded text-gray-500"
              name="studyMode" // Set the name attribute to identify the field in the handleChange function
              id="studyMode"
              value={userData.studyMode} // Set the value to reflect the selected value in userData
              onChange={handleChange} // Call handleChange when the selection changes
            >
              <option value="">Enter study mode</option>
              {/* Map over courseType array and create an option for each item */}
              {studyMode.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <label htmlFor="courseSeacrh">Course search</label>
            <select
              className="bg-white my-2 p-1 flex border border-gray-200 rounded text-gray-500"
              name="courseSearch" // Set the name attribute to identify the field in the handleChange function
              id="courseSearch"
              value={userData.courseSeacrh} // Set the value to reflect the selected value in userData
              onChange={handleChange} // Call handleChange when the selection changes
            >
              <option value="">Enter study mode</option>
              {/* Map over courseType array and create an option for each item */}
              {courseSearch.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <label htmlFor="entryYear">Entry year</label>
            <select
              className="bg-white my-2 p-1 flex border border-gray-200 rounded text-gray-500"
              name="entryYear" // Set the name attribute to identify the field in the handleChange function
              id="entryYear"
              value={userData.entryYear} // Set the value to reflect the selected value in userData
              onChange={handleChange} // Call handleChange when the selection changes
            >
              <option value="">Enter study mode</option>
              {/* Map over courseType array and create an option for each item */}
              {entryYear.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <label htmlFor="entryMonth">Entry month</label>
            <select
              className="bg-white my-2 p-1 flex border border-gray-200 rounded text-gray-500"
              name="entryMonth" // Set the name attribute to identify the field in the handleChange function
              id="entryMonth"
              value={userData.entryMonth} // Set the value to reflect the selected value in userData
              onChange={handleChange} // Call handleChange when the selection changes
            >
              <option value="">Enter study mode</option>
              {/* Map over courseType array and create an option for each item */}
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

