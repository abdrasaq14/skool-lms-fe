import { useSelector } from "react-redux";
import MainButton from "../../components/MainButton"
import ApplicationContainer from "../../components/applicationComponents/ApplicationContainer"
import ApplicationHeader from "../../components/applicationComponents/ApplicationHeader"
import "./ApplicationPage.css"
import { RootState } from "../../store/store"

function ApplicationPage() {

  const academicReferencesFilled = useSelector((state: RootState) => state.academicReferences.academicReferences);
  const employmentDetailsFilled = useSelector((state: RootState) => state.employmentDetails.employmentDetails);
  const disabilityDetailsFilled = useSelector((state: RootState) => state.disabilityDetails.disabilityDetails);
  const personalStatementFilled = useSelector((state: RootState) => state.personalStatement.personalStatement);


  return (
    <>
    <ApplicationHeader linkTo="/dashboard" header_text="Return to Dashboard"/>

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
          <ApplicationContainer header_text="Personal Statement" paragraph_text="Explain your application for this course." link_to="/dashboard/application/personal-statement" isFilled={personalStatementFilled}/>

          <ApplicationContainer header_text="Add qualifications" paragraph_text="Please list any credentials you have not yet disclosed to us." link_to="/dashboard/application/add-qualifications" isFilled={false}/>
        </div>

        <div className="flex flex-wrap justify-center mt-5">
          <ApplicationContainer header_text="Academic references" paragraph_text="We require feedback regarding your suitability from prior instructors." link_to="/dashboard/application/academic-references" isFilled={academicReferencesFilled}/>

          <ApplicationContainer header_text="Employment details" paragraph_text="Tell us about your past employment experience." link_to="/dashboard/application/employment-details" isFilled={employmentDetailsFilled}/>
        </div>

        <div className="flex flex-wrap justify-center mt-5">
          <ApplicationContainer header_text="Funding information" paragraph_text="Describe your payment plan for the course to us." link_to="/dashboard/application/funding-information" isFilled={false}/>

          <ApplicationContainer header_text="Disability" paragraph_text="Tell us about any disabilities you may have, if that makes you comfortable." link_to="/dashboard/application/disability" isFilled={disabilityDetailsFilled}/>       
        </div>

        <div className="flex flex-wrap justify-center mt-5">
          {/* <ApplicationContainer header_text="Passport upload" paragraph_text="Upload a picture of the photo page from your passport." link_to="/dashboard/application/passport-upload" isFilled={}/>

          <ApplicationContainer header_text="English language qualification" paragraph_text="Tell us about any education you have received in English." link_to="/dashboard/application/english-language-qualification" isFilled={}/>        */}
        </div>

      </div>

      <div className="submit-application-button mt-5 mx-auto mb-14" style={{ width: '25.5%' }}>
          <MainButton customClassName="opacity-50" button_text="Submit Application" disableHover={true} />
      </div>
    </div>
    </>
  )
}

export default ApplicationPage