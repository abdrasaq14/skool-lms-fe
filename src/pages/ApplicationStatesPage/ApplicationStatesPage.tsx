import { useEffect, useState } from "react";
import ApplicationHeader from "../../components/applicationComponents/ApplicationHeader";
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
  user: {
    firstName: string;
    lastName: string;
    countryOfResidence: string;
    phoneNumber: string;
    email: string;
  };
  course: {
    courseType: string;
    studyMode: string;
    courseSearch: string;
  }[];
}

function ApplicationStatesPage() {
  const [applicationData, setApplicationData] = useState<ApplicationDetails[]>(
    []
  );
  const [selectedTab, setSelectedTab] = useState<string | null>("Accepted");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axiosInstance.get(
          "/admin/professional-applications",
          {
            withCredentials: true,
          }
        );
        setApplicationData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(!loading);
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
console.log(filteredData);
  return (
    <>
      <div className="w-11/12 mx-auto py-6">
        <ApplicationHeader header_text="" linkTo="" />

        <div className="w-10/12 mx-auto flex items-center justify-center h-12  bg-gray-1 rounded-t-2xl">
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
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-20 h-20 border-t-4 border-b-4 border-green-600 rounded-full text-center animate-spin"></div>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <p className="text-2xl font-semibold">No application found</p>
          </div>
        ) : (
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
                  <td className="border-t-0  py-6">{`${application.user.firstName} ${application.user.lastName}`}</td>
                  <td className="border-t-0  py-6 px-16">
                    {application.course[0].courseType}
                  </td>
                  <td className="border-t-0  py-6 px-16">
                    {application.course[0].courseSearch}
                  </td>
                  <td className="border-t-0  py-6 px-16">
                    {application.status}
                  </td>

                  <td className="border-t-0  py-6 px-16">
                    <Link
                      to={`/admin/dashboard/application-view/${application.id}`}
                      className="hover:no-underline"
                    >
                      <span className="text-green-1 border-2 border-green-border-1 p-2 font-semibold cursor-pointer">
                        View&nbsp;Application
                      </span>
                    </Link>
                  </td>
                  <td className="border-t-0  py-6 cursor-pointer">
                    <PDFDownloadButton applicationId={application.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default ApplicationStatesPage;
