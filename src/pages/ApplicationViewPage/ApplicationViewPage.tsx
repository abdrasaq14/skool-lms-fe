import ApplicationHeader from "../../components/applicationComponents/ApplicationHeader";
// import avatar from "/images/avatar.png";
import Dots from "/images/Dots.png";
import { useState, useEffect } from "react";
import axios from "axios";
// import data from "../../dummy-data/data";

const ApplicationViewPage = () => {

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [Data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option: string) => {
    console.log(`Selected option: ${option}`);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/admin/professional-applications/${match.params.id}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching application data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [match.params.id]);

  const renderQualifications = () => {
    if (Data && Data.addQualification) {
      return Data.addQualification.map((qualification, index) => (
        <div key={index}>
          <h2 className="mt-2 font-semibold text-sm">
            {qualification.fieldOfStudy}, {qualification.institutionName}
          </h2>
          <p className="text-gray-500 font-light text-sm">
            {qualification.yearOfGraduation.toLocaleDateString()}
          </p>
        </div>
      ));
    }
    return null;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const passport = Buffer.from(Data.passportUpload.data);

  return (
    <div id="pdf-content">
      <ApplicationHeader
        linkTo="/dashboard/application"
        header_text="Return to Application Home"
      />
      <div className="w-9/12 h-10rem mx-auto mt-1">
        <div>
          <div className="h-[120px] top-92 left-211.5 gap-24 bg-green-500 p-4 rounded-t-2xl flex justify-between">
            <div className="w-200 h-120 top-32 left-32 rounded-full">
              <img
                src={`data:image/png;base64,${passport.toString(
                  "base64"
                )}`}
                alt="passport"
              />
            </div>
            <div className="mt-40">
              <img
                src={Dots}
                alt="Dots"
                className="cursor-pointer"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="absolute z-10 mt-2 bg-white border rounded-md shadow-md">
                  <ul>
                    <li
                      className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleOptionClick("Accept")}
                    >
                      Accept Application
                    </li>
                    <li
                      className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleOptionClick("Reject")}
                    >
                      Reject Application
                    </li>
                    <li
                      className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleOptionClick("Delete")}
                    >
                      Delete Application
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="h-[140px] top-92 left-211.5 gap-24 bg-white-500 p-4"></div>

        <div className="w-8/12 h-10rem mt-1">
          <div>
            <h2 className="text-black font-bold text-lg">
              {" "}
              {Data.user.firstName} {Data.user.lastName}
            </h2>
            <p className="text-gray-500 font-light text-sm mt-2">
              {Data.degree}
            </p>
          </div>

          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center justify-between">
              <svg
                className="w-6 h-6 text-gray-500 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                />
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.8 14h0a7 7 0 1 0-11.5 0h0l.1.3.3.3L12 21l5.1-6.2.6-.7.1-.2Z"
                />
              </svg>
              <p className="ml-2 font-medium text-sm">
                {Data.user.countryOfResidence}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-between">
                <svg
                  className="w-6 h-6 text-gray-500 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m18.4 14.8-1.2-1.3a1.7 1.7 0 0 0-2.4 0l-.7.7a1.7 1.7 0 0 1-2.4 0l-1.9-1.9a1.7 1.7 0 0 1 0-2.4l.7-.6a1.7 1.7 0 0 0 0-2.5L9.2 5.6a1.6 1.6 0 0 0-2.4 0c-3.2 3.2-1.7 6.9 1.5 10 3.2 3.3 7 4.8 10.1 1.6a1.6 1.6 0 0 0 0-2.4Z"
                  />
                </svg>
                <p className="ml-2 font-medium text-sm">
                  {Data.user.phoneNumber}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <svg
                className="w-6 h-6 text-gray-500 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="m3.5 5.5 7.9 6c.4.3.8.3 1.2 0l7.9-6M4 19h16c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1H4a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"
                />
              </svg>
              <p className="ml-2 font-medium text-sm">{Data.user.email}</p>
            </div>
          </div>

          <div className="mt-5">
            <h1 className="text-black font-bold text-base"> About:</h1>
            <p className="text-black font-light text-sm mt-2 w-11/12">
              {Data.personalStatement}
            </p>
          </div>

          <div className="mt-5">
            <h1 className="text-black font-bold text-base"> Education: </h1>
            {renderQualifications()}
          </div>

          <div className="mt-5">
            <h1 className="text-black font-bold text-base">Work Experience:</h1>
            <p className="text-gray-500 font-light text-sm ml-5">
              {Data.employmentDetails
                ? "Available Work Experience"
                : "No Work Experience"}
            </p>
          </div>

          <div className="mt-5">
            <h1 className="text-black font-bold text-base">
              Funding Information:
            </h1>
            <p className="text-black font-light text-sm ml-5">
              {Data.fundingInformation}
            </p>
          </div>

          <div className="mt-5">
            <h1 className="text-black font-bold text-base">Disabilty</h1>
            <p className="text-black font-light text-sm ml-5">
              {Data.disablity}
            </p>
          </div>

          <div className="mt-5">
            {Data.academicReference ? (
              <h1 className="w-1/4 text-black font-light text-sm ml-5 flex items-center justify-between">
                <svg
                  className="w-6 h-6 text-green-400 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m5 12 4.7 4.5 9.3-9"
                  />
                </svg>
                Academic References
              </h1>
            ) : (
              <h1 className="w-1/4 text-black font-light text-sm ml-5 flex items-center justify-between">
                <svg
                  className="w-6 h-6 text-red-400 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18 18 6m0 12L6 6"
                  />
                </svg>
                Academic References
              </h1>
            )}
          </div>

          <div className="mt-5">
            {Data.englishLanguageQualification ? (
              <h1 className="w-1/3 text-black font-light text-sm ml-5 flex items-center justify-between">
                <svg
                  className="w-6 h-6 text-green-400 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m5 12 4.7 4.5 9.3-9"
                  />
                </svg>
                English Language Qualification
              </h1>
            ) : (
              <h1 className="w-1/3 text-black font-light text-sm ml-5 flex items-center justify-between">
                <svg
                  className="w-6 h-6 text-red-400 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18 18 6m0 12L6 6"
                  />
                </svg>
                English Language Qualification
              </h1>
            )}
          </div>

          <div className="mt-10 flex items-center justify-between w-1/3">
            <h1 className="text-black font-light text-sm"> Documents</h1>
            <PageDownload />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationViewPage;