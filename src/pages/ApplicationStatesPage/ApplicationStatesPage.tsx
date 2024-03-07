import { useEffect, useState } from "react";
import decagonLogo from "/images/decagon-logo.png";
import axiosInstance from "../../utils/axiosInstance";
import { Link } from "react-router-dom";
import PDFDownloadButton from "../../components/DownloadFunction/SingleDownload";

interface addQualification {
  gradeOrCGPA: string;
  fieldOfStudy: string;
  institutionName: string;
  yearOfGraduation: string;
  qualificationType: string;
  countryOfInstitution: string;
}

interface ApplicationDetails {
  id: string;
  personalStatement: string;
  addQualification: addQualification;
  academicReference: boolean;
  employmentDetails: boolean;
  fundingInformation: string;
  disabilty: string;
  englishLanguageQualification: boolean;
  applicantId: string;
  degree: string;
  passport: string;
  status: string;
}

function ApplicationStatesPage() {
  const firstName = localStorage.getItem("name");
  const [applicationData, setApplicationData] = useState<ApplicationDetails[]>(
    []
  );
  const [selectedTab, setSelectedTab] = useState<string | null>("Accepted");

  useEffect(() => {
    // setData(dummyData);
    const fetchApplications = async () => {
      try {
        const response = await axiosInstance.get(
          "/admin/professional-applications",
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        setApplicationData(response.data);
        console.log(applicationData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApplications();
  }, []);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const filteredData = selectedTab
    ? applicationData.filter(
        (application: ApplicationDetails) =>
          application.status.toLocaleLowerCase() === selectedTab.toLowerCase()
      )
    : applicationData;

  return (
    <>
      <div className="w-9/12 mx-auto py-6">
        <div className="flex justify-between">
          <img src={decagonLogo} alt="Decagon logo" />

          <div className="flex justify-between gap-6 align-middle items-center">
            <div className="flex justify-center items-center gap-2">
              <div className="bg-blue-400 text-blue-600 rounded-full w-10 h-10 flex justify-center items-center">
                <p className="font-semibold text-base">NN</p>
              </div>

              <div className="font-normal text-base">{firstName}</div>
            </div>
          </div>
        </div>

        <div className="w-10/12 mx-auto flex items-center justify-center h-12 mt-14 bg-gray-1 rounded-t-2xl">
          <div
            className={`mr-16 cursor-pointer font-medium hover:bg-white rounded-t-xl w-259px h-fit py-4 px-4 ${
              selectedTab === "Accepted"
                ? "bg-white rounded-t-xl w-259px h-fit py-4 px-4"
                : ""
            }`}
            onClick={() => handleTabClick("Accepted")}
          >
            Accepted Applications
          </div>
          <div
            className={`mr-16 cursor-pointer font-medium hover:bg-white rounded-t-xl w-259px h-fit py-4 px-4 ${
              selectedTab === "Rejected"
                ? "bg-white rounded-t-xl w-259px h-fit py-4 px-4"
                : ""
            }`}
            onClick={() => handleTabClick("Rejected")}
          >
            Rejected Applications
          </div>
          <div
            className={`mr-16 cursor-pointer font-medium hover:bg-white rounded-t-xl w-259px h-fit py-4 px-4 ${
              selectedTab === "Pending"
                ? "bg-white rounded-t-xl w-259px h-fit py-4 px-4"
                : ""
            }`}
            onClick={() => handleTabClick("Pending")}
          >
            Pending Applications
          </div>
        </div>

        <table className="mx-auto mt-2 w-80%">
          <thead className="bg-white border-none ">
            <tr>
              <th className="border-none  py-6 "></th>
              <th className="border-none  py-6 ">Name</th>
              <th className="border-none  py-6 px-16">Program Applied</th>
              <th className="border-none  py-6 px-16">Degree</th>
              <th className="border-none  py-6 px-16">Status</th>

              <th className="border-none  py-6 px-16"></th>
              <th className="border-none  py-6"></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((application: ApplicationDetails) => (
              <tr key={application.id}>
                <td className="border-t-0  py-6 ">
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    name="application"
                  />
                </td>
                <td className="border-t-0  py-6">{"Dorcas Ajah"}</td>
                <td className="border-t-0  py-6 px-16">{"Business Admin"}</td>
                <td className="border-t-0  py-6 px-16">{"Master's Degree"}</td>
                <td className="border-t-0  py-6 px-16">{application.status}</td>

                <td className="border-t-0  py-6 px-16">
                  <Link to="/dashboard/application-view" className="hover:no-underline">
                  <span className="text-green-1 border-2 border-green-border-1 p-2 font-semibold cursor-pointer">
                    View&nbsp;Application
                  </span>
                  </Link>
                </td>
                <td className="border-t-0  py-6 cursor-pointer">
                  <PDFDownloadButton />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ApplicationStatesPage;
