import { MouseEventHandler, useEffect, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import axiosInstance from "../../utils/axiosInstance";
import { Link } from "react-router-dom";
import PDFDownloadButton from "../../components/DownloadFunction/SingleDownload";
import Dots from "/images/Dots.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string | null>("Accepted");
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [applicationsPerPage] = useState(10); // Number of applications to display per page

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
    const updatedSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];
    setSelectedIds(updatedSelectedIds);
  };

  const handleDeleteButtonClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    if (selectedIds.length > 0) {
      await handleConfirmDelete(selectedIds);
    }
  };
  


  const handleDeleteSelected = () => {
    setShowModal(true);
  };

 

const handleConfirmDelete = async (idsToDelete: string[]) => {
  try {
    console.log(idsToDelete);
    
    await axiosInstance.delete(`/users/professional-applications`, {
      data: { applicationIds: idsToDelete },
    });
    
    setApplicationData(
      applicationData.filter(
        (application) => !idsToDelete.includes(application.id)
      )
    );
  } catch (error) {
    console.error("Error deleting applications:", error);
  }
  setShowModal(false);
};

  

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const downloadApplicationsAsPDF = async (applicationIds: string[]) => {
    try {
        const pdf = new jsPDF();

        for (const applicationId of applicationIds) {
            const response = await axiosInstance.get(`http://localhost:3000/download-pdf/${applicationId}`, {
                responseType: 'text',
            });
            const htmlContent = response.data;

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlContent;
            document.body.appendChild(tempDiv);

            const canvas = await html2canvas(tempDiv);
            const imgData = canvas.toDataURL('image/png');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

            document.body.removeChild(tempDiv);
        }

        pdf.save('download.pdf');
    } catch (error) {
        console.error('Error downloading applications as PDF:', error);
    }
};


  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // const handleDownloadSelected = async () => {};

  const filteredData = selectedTab
    ? applicationData.filter(
        (application: ApplicationDetails) =>
          application.status.toLocaleLowerCase() === selectedTab.toLowerCase()
      )
    : applicationData;

  // Logic for pagination

  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = filteredData.slice(
    indexOfFirstApplication,
    indexOfLastApplication
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="w-full md:w-1/3 mx-auto mt-10">
        {showModal && (
          <div className="rounded-lg bg-white p-8 shadow-2xl">
            <h2 className="text-lg font-bold">
              Are you sure you want to delete these applications?
            </h2>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
                onClick={handleDeleteButtonClick}
              >
                Yes, I'm sure
              </button>

              <button
                type="button"
                className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
                onClick={handleCancelDelete}
              >
                No, go back
              </button>
            </div>
          </div>
        )}
      </div>

      <AdminHeader header_text="" linkTo="" />

      <div className="w-8/12 mx-auto">
        <div className="flex items-center justify-center h-12  bg-gray-1 rounded-t-2xl mt-8">
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
            className={` cursor-pointer font-medium hover:bg-white rounded-t-xl w-259px h-fit py-4 px-4 ${
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
        ) : currentApplications.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <p className="text-2xl font-semibold">No application found</p>
          </div>
        ) : (
          <div>
            <table className=" mt-2 w-full ">
              <thead className=" border-none bg-white">
                <tr>
                  <th className="border-none  py-6 "></th>
                  <th className="border-none  py-6 ">Name</th>
                  <th className="border-none  py-6 ">Program Applied</th>
                  <th className="border-none  py-6 ">Degree</th>
                  <th className="border-none  py-6 ">Status</th>
                  {selectedIds.length > 1 && (
                    <th className="border-none py-6 flex justify-end  ">
                      <img
                        src={Dots}
                        alt="Dots"
                        className="cursor-pointer"
                        onClick={toggleDropdown}
                      />
                      {isDropdownOpen && (
                        <div className="absolute z-10 mt-8 right-20 mr-10 bg-white border rounded-md shadow-md">
                          <ul>
                            <li className="py-2 px-4 cursor-pointer hover:bg-gray-100" onClick={() => downloadApplicationsAsPDF(selectedIds)}>
                              <a className="group relative inline-flex items-center overflow-hidden rounded  px-4 py-3 hover:no-underline text-black ">
                                <span className="absolute -start-full transition-all group-hover:start-4">
                                  <svg
                                    className="size-5 rtl:rotate-180 "
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                  </svg>
                                </span>

                                <span className="text-sm font-medium transition-all group-hover:ms-4 pl-2">
                                  {" "}
                                  Download {
                                  selectedIds.length === filteredData.length ? "all" : selectedIds.length} applications
                                </span>
                              </a>
                            </li>
                            <li className="py-4 px-5 cursor-pointer hover:bg-gray-100" onClick={handleDeleteSelected}>
                              <a className="group relative inline-flex items-center overflow-hidden rounded  px-5 py-3  hover:no-underline text-black">
                                <span className="absolute -start-full transition-all group-hover:start-4">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-4 "
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </span>

                                <span className="text-sm font-medium transition-all group-hover:ms-4 " >
                                  {" "}
                                  Delete {selectedIds.length === filteredData.length ? "all" : selectedIds.length} applications
                                </span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      )}
                    </th>
                  )}

                  <th className="border-none"></th>
                  <th className="border-none"></th>
                </tr>
              </thead>
              <tbody>
                {currentApplications.map((application: ApplicationDetails) => (
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
                    <td className="border-t-0 py-6 ">{`${application.user.firstName} ${application.user.lastName}`}</td>
                    <td className="border-t-0 py-6 ">
                      {application.course[0].courseType}
                    </td>
                    <td className="border-t-0 py-6">
                      {application.course[0].courseSearch}
                    </td>
                    <td className="border-t-0 py-6 ">{application.status}</td>

                    <td className="border-t-0">
                      <Link
                        to={`/admin/dashboard/application-view/${application.id}`}
                        className="hover:no-underline"
                      >
                        <span className="text-green-1 border-2 border-green-border-1 p-2 font-semibold cursor-pointer">
                          View&nbsp;Application
                        </span>
                      </Link>
                    </td>
                    <td className="border-t-0 cursor-pointer text-center">
                      <PDFDownloadButton applicationId={application.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="w-full flex justify-center my-4">
        <ul className="flex">
          {Array.from(
            { length: Math.ceil(filteredData.length / applicationsPerPage) },
            (_, i) => i + 1
          ).map((number) => (
            <li key={number}>
              <button
                className={`mx-1 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  currentPage === number
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ApplicationStatesPage;
