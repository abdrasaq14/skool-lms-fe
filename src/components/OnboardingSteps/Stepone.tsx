import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

interface IStepProps {
  changeActiveStep: (step: number) => void;
  courseType: string[];
  studyMode: string[];
  courseSearch: string[];
  entryYear: number[];
  entryMonth: string[];
  // Define courseType as a prop
}

interface IFormData {
  name: string;
  email: string;
  password: string;
  courseType: string;
  studyMode: string;
  courseSearch: string;
  entryYear: number;
  entryMonth: string;
}

export const Stepone: React.FC<IStepProps> = ({
  changeActiveStep,
  courseType,
  studyMode,
  courseSearch,
  entryYear,
  entryMonth,
}) => {
  const [formData, setFormData] = useState<IFormData>({
    name: " ",
    email: " ",
    password: " ",
    courseType: "",
    studyMode: " ",
    courseSearch: " ",
    entryYear: 0,
    entryMonth: " ",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    changeActiveStep(2);
  };

  const handlePreviousStep = () => {
    changeActiveStep(0); // Assuming 0 is the index for the previous step
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div onClick={handlePreviousStep} className="flex flex-row fixed top-4">
        <button className="pr-2 ">
          {" "}
          <FaArrowLeftLong />
        </button>
        <button className="transition-transform transform hover:scale-105 hidden md:block">
          Return to log in
        </button>
      </div>
      <div className="flex items-center justify-center py-6 w-3/4 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="font-inter text-2xl font-semibold leading-10 tracking-tighter text-center">
              Find your course
            </div>

            <p className="text-base font-normal leading-6 tracking-tighter text-center py-5 ">
              Enter your chosen course. We'll help you find the one that's right
              for you
            </p>

            <div className="w-[500px] h-[597px] px-6 rounded-[16px] gap-[10px] shadow-lg flex flex-col justify-center">
              <div>
                <label htmlFor="courseType">Course type</label>
                <select
                  className="w-full rounded-lg border border-gray-600 p-4  text-sm shadow-sm"
                  name="courseType"
                  id="courseType"
                  value={formData.courseType}
                  onChange={handleSelectChange}
                >
                  <option value="">Enter your course type</option>
                  {courseType.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="studyMode">Study mode</label>
                <select
                  className="w-full rounded-lg border border-gray-600 p-4  text-sm shadow-sm"
                  name="studyMode"
                  id="studyMode"
                  value={formData.studyMode}
                  onChange={handleSelectChange}
                >
                  <option value="">Enter study mode</option>
                  {studyMode.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="courseSearch">Course search</label>
                <select
                  className="w-full rounded-lg border border-gray-600 p-4  text-sm shadow-sm"
                  name="courseSearch"
                  id="courseSearch"
                  value={formData.courseSearch}
                  onChange={handleSelectChange}
                >
                  <option value="">Enter course</option>
                  {courseSearch.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="courseSearch">Entry year</label>
                <select
                  className="w-full rounded-lg border border-gray-600 p-4  text-sm shadow-sm"
                  name="entryYear"
                  id="entryYear"
                  value={formData.entryYear}
                  onChange={handleSelectChange}
                >
                  <option value="">Enter study year</option>
                  {entryYear.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="entryMonth">Entry month</label>
                <select
                  className="w-full rounded-lg border border-gray-600 p-4  text-sm shadow-sm"
                  name="entryMonth"
                  id="entryMonth"
                  value={formData.entryMonth}
                  onChange={handleSelectChange}
                >
                  <option value="">Enter month</option>
                  {entryMonth.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between items-center py-7">
                <button
                  type="submit"
                  className="w-full bg-green-700 rounded-lg border p-3 text-white font-semibold text-center transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
                >
                  Save and continue
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
