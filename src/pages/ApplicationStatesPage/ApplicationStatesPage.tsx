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
  const [showModal, setShowModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string | null>("Accepted");
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleCheckboxChange = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const WarningModal = () => (
    <div className="rounded-lg bg-white p-8 shadow-2xl">
  <h2 className="text-lg font-bold">Are you sure you want to delete these applications?</h2>

  <div className="mt-4 flex gap-2">
    <button type="button" className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
    onClick={handleConfirmDelete}
    >
      Yes, I'm sure
    </button>

    <button type="button" className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
    onClick={handleCancelDelete}
    >
      No, go back
    </button>
  </div>
</div>
  )
  const handleDeleteSelected = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    // Implement logic to delete selected applications
    console.log("Deleting selected applications...");
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  // const handleDownloadSelected = () => {
  //   // Implement logic to download selected applications
  //   console.log("Download selected applications: ", selectedIds);
  // };

  const filteredData = selectedTab
    ? applicationData.filter(
        (application: ApplicationDetails) =>
          application.status.toLocaleLowerCase() === selectedTab.toLowerCase()
      )
    : applicationData;

  return (
    
    <>
    <div className="w-full md:w-1/3 mx-auto mt-10">
    {showModal && < WarningModal />}
    </div>
    
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
                      checked={selectedIds.includes(application.id)}
                      onChange={() => handleCheckboxChange(application.id)}
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
        {selectedIds.length > 1 && (
          <div className="flex justify-between px-20 py-4  ">
            <div className="">
              <button
                className="bg-red-600 px-4 py-3 text-center rounded-lg text-white hover:bg-red-400 flex flex-row"
                onClick={handleDeleteSelected}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete{" "}
                {selectedIds.length === filteredData.length
                  ? "all"
                  : selectedIds.length}{" "}
                applications
              </button>
            </div>

            <div className="">
              <button className="bg-green-600 px-4 py-3 text-center rounded-lg text-white hover:bg-green-400">
              Download {
                  selectedIds.length === filteredData.length
                    ? "all "  
                    : selectedIds.length
                }  applications
              </button>
            </div>
          </div>
        )}
      </div>
      
    </>
  );
}

export default ApplicationStatesPage;
