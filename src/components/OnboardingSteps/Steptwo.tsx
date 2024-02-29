import { useState } from "react";

interface IStepProps {
  changeActiveStep: (step: number) => void;
  gender: string[];
  birthCountry: string[];
    residenceCountry: string[];
    nationality: string[];
  // Define courseType as a prop
}

interface IFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  birthCountry: string;
  residenceCountry: string;
  nationality: string;

}

export const Steptwo: React.FC<IStepProps> = ({
  changeActiveStep,
  gender,
  birthCountry,
  residenceCountry,
  nationality,

}) => {
  const [formData, setFormData] = useState<IFormData>({
    firstName: " ",
    lastName: " ",
    email: " ",
    phone: " ",
    gender: "",
    birthCountry: " ",
    residenceCountry: " ",
    nationality: " ",

  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    changeActiveStep(2);
  };

  const handlePreviousStep = () => {
    changeActiveStep(-1 ); // Assuming 0 is the index for the previous step
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center py-6 w-3/4 mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 items-center">
          <div className="font-inter text-2xl font-semibold leading-10 tracking-tighter text-center">
            Start your application
          </div>

          <p className="text-base font-normal leading-6 tracking-tighter text-center py-5">
            We need more information about you before we can begin processing
            your application. Some of them have been completed for you by us.
            Verify that the information on your passport or other travel
            document matches exactly.
          </p>

          <div className="w-[500px] h-[866px] p-8 rounded-lg gap-[10px] shadow-lg flex flex-col justify-center">
            <div>
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-600 p-4 pe-12 text-sm shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="firstname">Last Name</label>
              <input
                type="text"
                id="lasttName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-600 p-4 pe-12 text-sm shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-600 p-4 pe-12 text-sm shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="email">Phone Number</label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-600 p-4 pe-12 text-sm shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="gender">Gender</label>
              <select
                className="w-full rounded-lg border border-gray-600 p-4  text-sm shadow-sm"
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleSelectChange}
              >
                <option value="">Male</option>
                {gender.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="birthCountry">Country of birth</label>
              <select
                className="w-full rounded-lg border border-gray-600 p-4  text-sm shadow-sm"
                name="birthCountry"
                id="birthCountry"
                value={formData.birthCountry}
                onChange={handleSelectChange}
              >
                <option value="">Nigeria</option>
                {birthCountry.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="birthCountry">
                Country of permanent residence
              </label>
              <select
                className="w-full rounded-lg border border-gray-600 p-4  text-sm shadow-sm"
                name="residenceCountry"
                id="residenceCountry"
                value={formData.residenceCountry}
                onChange={handleSelectChange}
              >
                <option value="">Nigeria</option>
                {residenceCountry.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="birthCountry">Nationality</label>
              <select
                className="w-full rounded-lg border border-gray-600 p-4  text-sm shadow-sm"
                name="nationality"
                id="nationality"
                value={formData.nationality}
                onChange={handleSelectChange}
              >
                <option value="">Nigeria</option>
                {nationality.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between items-center py-7">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="inline-block rounded bg-gray-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
              >
                Previous
              </button>
              <button
                type="submit"
                className="inline-block rounded bg-green-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};


