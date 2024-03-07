import  { useState } from 'react';
import { useSelector } from "react-redux";
import MainButton from "../../components/MainButton"
import ApplicationContainer from "../../components/applicationComponents/ApplicationContainer"
import ApplicationHeader from "../../components/applicationComponents/ApplicationHeader"
import AppliedSuccessful from "../../components/applicationComponents/AppliedSuccessful"; // Added import
import AppliedRejected from "../../components/applicationComponents/AppliedRejected"; // Added import
import { RootState } from "../../store/store"
import axiosInstance from "../../utils/axiosInstance";

function ApplicationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showReject, setShowReject] = useState(false); // State to show AppliedRejected

  // State to check if all applications are completed
  const [allApplicationsCompleted, setAllApplicationsCompleted] = useState(false);

  const academicReferencesFilled = useSelector((state: RootState) => state.academicReferences.academicReferences);
  const qualificationsFilled = useSelector((state: RootState) => state.qualifications.qualificationDetails);
  const employmentDetailsFilled = useSelector((state: RootState) => state.employmentDetails.employmentDetails);
  const disabilityDetailsFilled = useSelector((state: RootState) => state.disabilityDetails.disabilityDetails);
  const personalStatementFilled = useSelector((state: RootState) => state.personalStatement.personalStatement);
  const fundingInformationFilled = useSelector((state: RootState) => state.fundingInformation.fundingInformation);
  const englishQualificationFilled = useSelector((state: RootState) => state.englishQualification.englishQualification);
  const uploadPassportFilled = useSelector((state: RootState) => state.uploadPassport.uploadedImage);

  // Check if all cards are filled
  const isAllCardsFilled =
    academicReferencesFilled &&
    qualificationsFilled &&
    employmentDetailsFilled &&
    disabilityDetailsFilled &&
    personalStatementFilled &&
    fundingInformationFilled &&
    englishQualificationFilled &&
    uploadPassportFilled;

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!isAllCardsFilled) {
      setShowReject(true); // Show AppliedRejected if not all cards are filled
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Make a POST request to the backend endpoint
      const res = await axiosInstance.post("/users/professional-application", {
        personalStatement: personalStatementFilled,
        addQualification: qualificationsFilled,
        academicReference: academicReferencesFilled,
        employmentDetails: employmentDetailsFilled,
        fundingInformation: fundingInformationFilled,
        disability: disabilityDetailsFilled,
        passportUpload: uploadPassportFilled,
        englishLanguageQualification: englishQualificationFilled
      });

      console.log(res);

      if (res.status === 201) {
        // Application submitted successfully
        setShowSuccess(true);
        setAllApplicationsCompleted(true); // Update application status
      } else {
        // Handle other response status codes (e.g., 4xx, 5xx)
        setSubmitError("An error occurred while submitting the application. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitError("An error occurred while submitting the application. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };


  if (showSuccess && allApplicationsCompleted) {
    return <AppliedSuccessful message={'AppliedSuccessful'} icon={''} buttonText={'close'} />;
  }

  return (
    <>
      <ApplicationHeader linkTo="/dashboard" header_text="Return to Dashboard" />

      <div style={{ marginTop: '-10px' }}>
        <div className="text-center w-8/12 mx-auto">

          <div className="mb-2 font-inter font-semibold text-2xl">
            <h3>
              Master of Data Science and Analytics
            </h3>
          </div>

          <div className="font-inter font-normal text-base">
            <p >
              To proceed with your course application, fill out the remaining sections.
            </p>
          </div>

          <div className="font-inter font-normal text-base">
            <p>
              Upon their completion, you can send in your application. Some of the data you have already entered will be pre-filled for you to
            </p>
          </div>

          <div className="font-inter font-normal text-base">
            <p>
              save time.
            </p>
          </div>

        </div>

        <div className="flex-wrap">

          <div className="flex flex-wrap justify-center mt-5">
            <ApplicationContainer header_text="Personal Statement" paragraph_text="Explain your application for this course." link_to="/dashboard/application/personal-statement" isFilled={personalStatementFilled} />

            <ApplicationContainer header_text="Add qualifications" paragraph_text="Please list any credentials you have not yet disclosed to us." link_to="/dashboard/application/qualifications" isFilled={qualificationsFilled} />
          </div>

          <div className="flex flex-wrap justify-center mt-5">
            <ApplicationContainer header_text="Academic references" paragraph_text="We require feedback regarding your suitability from prior instructors." link_to="/dashboard/application/academic-references" isFilled={academicReferencesFilled} />

            <ApplicationContainer header_text="Employment details" paragraph_text="Tell us about your past employment experience." link_to="/dashboard/application/employment-details" isFilled={employmentDetailsFilled} />
          </div>

          <div className="flex flex-wrap justify-center mt-5">
            <ApplicationContainer header_text="Funding information" paragraph_text="Describe your payment plan for the course to us." link_to="/dashboard/application/funding-information" isFilled={fundingInformationFilled} />

            <ApplicationContainer header_text="Disability" paragraph_text="Tell us about any disabilities you may have, if that makes you comfortable" link_to="/dashboard/application/disability-details" isFilled={disabilityDetailsFilled} />
          </div>

          <div className="flex flex-wrap justify-center mt-5">
            <ApplicationContainer header_text="Passport upload" paragraph_text="Upload a picture of the photo page from your passport." link_to="/dashboard/application/upload-passport" isFilled={uploadPassportFilled} />

            <ApplicationContainer header_text="English language qualification" paragraph_text="Tell us about any education you have received in English." link_to="/dashboard/application/english-qualification" isFilled={englishQualificationFilled} />
          </div>

        </div>

        <div className="submit-application-button mt-5 mx-auto mb-14" style={{ width: '25.5%' }}>
          <MainButton customClassName={isAllCardsFilled ? "" : "opacity-50"} button_text="Submit Application" disableHover={!isAllCardsFilled || isSubmitting} onClick={handleSubmit} />
          {submitError && <p className="text-red-500 mt-2">{submitError}</p>}
        </div>
      </div>

      {/* Render AppliedRejected if not all cards are filled */}
      {showReject && <AppliedRejected message={'AppliedRejected'}  buttonText={'close'} />}
    </>
  );
}

export default ApplicationPage;
