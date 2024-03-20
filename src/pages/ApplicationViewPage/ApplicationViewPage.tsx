import ApplicationHeader from "../../components/applicationComponents/ApplicationHeader";
import Dots from "/images/Dots.png";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PageDownload from "../../components/DownloadFunction/PageDownload";
import ApplicationSuccessful from "../../components/applicationComponents/AppliedSuccessful";
import AppliedRejected from "../../components/applicationComponents/AppliedRejected";

interface Data {
  user: {
    firstName: string;
    lastName: string;
    countryOfResidence: string;
    phoneNumber: string;
    email: string;
  };
  status: string;
  personalStatement: string;
  addQualification: {
    gradeOrCGPA: string;
    fieldOfStudy: string;
    institutionName: string;
    yearOfGraduation: string;
    qualificationType: string;
    countryOfInstitution: string;
  };
  employmentDetails: boolean;
  fundingInformation: string;
  disability: string;
  academicReference: boolean;
  englishLanguageQualification: boolean;
  passportUpload: {
    data: number[];
  };
}

const ApplicationViewPage = () => {

  const navigate = useNavigate();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [Data, setData] = useState<Data>({} as Data);
  const [loading, setLoading] = useState(true);
  const [ userId, setUserId ] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionAccept = async () => {
    try {
      const response = await axiosInstance.put(
      `/users/approve-application/${id}`
      
    );
    const notifyUsers = await axiosInstance.post(`/admin/notification/${userId}`, {
      title: "Application Accepted", 
      message: `Your application to Decagon University has been accepted. Check your email to view your admission info.`,
      
    })
    console.log("notice", notifyUsers)
    if (response.data.message) {
      setShowSuccessModal(true);
    }
    setDropdownOpen(false);
    } catch (error) {
      console.error("Error approving application:", error);
    }
  }
  const closeModal = () => {
    setShowSuccessModal(false);
    navigate("/admin/applications-section");
  };

  // Render the success modal
  const renderSuccessModal = () => {
    if (showSuccessModal) {
      return (
        <div className="modal-overlay">
          <ApplicationSuccessful
            message="Application Accepted"
            buttonText="OK"
            icon={""}
            onClick={closeModal}
          />
        </div>
      );
    }
    return null;
  };

  const handleOptionReject = async () => {
    try {
      const response = await axiosInstance.put(
      `/users/reject-application/${id}`
    );
    const notifyUsers = await axiosInstance.post(`/admin/notification/${userId}`, {
      title: "Application Rejected", 
      message: `Dear Candidate,
      We appreciate your time and effort in joining Decagon University. Unfortunately, we regret to inform you that your application to Decagon University has been declined. While we will not continue with your application at the moment, you may stay tuned to updates on our application portal.
      Best regards,
      Decagon University.
      `
    })
    console.log("notice", notifyUsers)
    if (response.data.message) {
      setShowRejectModal(true);
    }
    setDropdownOpen(false);
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };
  const closeRejectModal = () => {
    setShowRejectModal(false);
    navigate("/admin/applications-section");
  };

  // Render the reject modal
  const renderRejectModal = () => {
    if (showRejectModal) {
      return (
        <div className="modal-overlay">
          <AppliedRejected
            message="Application Rejected"
            buttonText="OK"
            icon={""}
            onClick={closeRejectModal}
          />
        </div>
      );
    }
    return null;
  };

  const handleOptionDelete = async () => {
    try {
      const response = await axiosInstance.delete(
        `/users/professional-application/${id}`
      );
      if (response.data.message) {
        navigate("/admin/applications-section");
      }
      setDropdownOpen(false);
    } catch (error) {
      console.error("Error Deleting application:", error);
    }
  };

  const { id } = useParams();

  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        const response = await axiosInstance.get(
          `/admin/professional-applications/${id}`
        );
        console.log("Data: ", response.data.user.id);
        setUserId(response.data.user.id)
        
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching application data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [id]);

  const renderQualifications = () => {
    if (Data && Data.addQualification) {
      return (
        <div>
          <h2 className="mt-2 font-semibold text-sm">
            {Data.addQualification.fieldOfStudy},{" "}
            {Data.addQualification.institutionName}
          </h2>
          <p className="text-gray-500 font-light text-sm">
            {Data.addQualification.yearOfGraduation}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (<div className="flex items-center justify-center">
      <div className=" mt-40 w-20 h-20 border-t-4 border-b-4 border-green-600 rounded-full text-center animate-spin"></div>
    </div>)
  }

  const base64Image = Data.passportUpload.data.reduce(
    (acc, current) => acc + String.fromCharCode(current),
    ""
  );
  const imageDataUri = `data:image/png;base64,${btoa(base64Image)}`;

  console.log("Data: ", Data);
  

  return (
    <div id="pdf-content">
      <ApplicationHeader
        linkTo="/admin/applications-section"
        header_text="Return to Admin Dashboard"
      />
      {loading ? (
        <div className="flex items-center justify-center">
          <div className=" mt-40 w-20 h-20 border-t-4 border-b-4 border-green-600 rounded-full text-center animate-spin"></div>
        </div> 
      ):(
        <>      
      {renderSuccessModal()}
      {renderRejectModal()}
      <div className="w-9/12 h-10rem mx-auto mt-1">
        <div>
          <div className="h-[120px] top-92 left-211.5 gap-24 bg-green-500 p-4 rounded-t-2xl flex justify-between">
            <div className="w-200 h-120 top-32 left-32 rounded-full">
              <img src={imageDataUri} alt="passport" />
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
                      onClick={handleOptionAccept}
                    >
                      Accept Application
                    </li>
                    <li
                      className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                      onClick={handleOptionReject}
                    >
                      Reject Application
                    </li>
                    <li
                      className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                      onClick={handleOptionDelete}
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
              {/* {Data.degree} */}
            </p>
          </div>

          <div className="flex items-center justify-between mt-5">

            <div className="flex items-center justify-between">
              <svg
                className="w-6 h-6 text-gray-500"
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
                  className="w-6 h-6 text-gray-500 "
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
                className="w-6 h-6 text-gray-500"
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
              {Data.disability}
            </p>
          </div>

          <div className="mt-5">
            {Data.academicReference ? (
              <h1 className="w-1/4 text-black font-light text-sm ml-5 flex items-center justify-between">
                <svg
                  className="w-6 h-6 text-green-400"
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
                  className="w-6 h-6 text-red-400 "
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
                  className="w-6 h-6 text-green-400"
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
                  className="w-6 h-6 text-red-400 "
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

          <div className="mt-10 flex items-center justify-between w-1/3 mb-20">
            <h1 className="text-black font-light text-sm"> Documents</h1>
            <PageDownload />
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default ApplicationViewPage;
