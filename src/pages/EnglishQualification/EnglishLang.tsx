import MainButton from "../../components/MainButton";
import { useEffect, useState } from "react";
import ApplicationHeader from "../../components/applicationComponents/ApplicationHeader";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../../states/applicationDetails/employmentDetailsSlice";
// import { employmentDetailsState } from "../../states/applicationDetails/employmentDetailsSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";

function EnglishQualification() {

  const employmentDetailsRedux = useSelector((state: RootState) => state.academicReferences.academicReferences);
  console.log(employmentDetailsRedux)
  const [employmentDetails, setEmploymentDetails] = useState<boolean | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedValue = localStorage.getItem("employmentDetails");
    if (storedValue !== null) {
      setEmploymentDetails(JSON.parse(storedValue));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  if (employmentDetails !== null) { 
    dispatch(updateDetails(employmentDetails));
    navigate("/dashboard/application");
   }
  }; 

  const handleRadioChange = (value: boolean) => {
    setEmploymentDetails(value);
    localStorage.setItem("employmentDetails", JSON.stringify(value));
  };

  return (
    <>
     <ApplicationHeader linkTo="/dashboard/application" header_text="Return to Application Home"/>

      <div className=" w-9/12 mx-auto text-center mt-12">
        
        <div className=" text-black w-3/12 mx-auto font-semibold text-2xl mb-4">
          <h3>English language qualification</h3>
        </div>
        <div>
          <p>
           Before you begin your course, we will need an examination of your English language proficiency 
uploading your documentation as soon as possible will be ideal.
          </p>
    
        </div>

        <div>
          <form onSubmit={handleSubmit} className=" w-5/12 mx-auto mt-8 flex flex-col gap-3">

          <div className="w-9/12 mx-auto">
            <div className=" text-left mb-3">Do you have an English language qualification ?</div>

            
                <div>
              <label htmlFor="answerYes" className="flex justify-start gap-2 p">
                <input
                  type="radio"
                  className=""
                  name="answer"
                  id="answerYes"
                  checked={employmentDetails === true}
                  onChange={() => handleRadioChange(true)}
                />
                <span className="">Yes</span>
              </label>
            </div>

            <div>
              <label htmlFor="answerNO" className="flex justify-start gap-2">
                <input
                  type="radio"
                  className=""
                  name="answer"
                  id="answerNO"
                  checked={employmentDetails === false}
                  onChange={() => handleRadioChange(false)}
                />
                <span className="">No</span>
               
              </label>

            </div>
           </div> 

            <div className="mt-4 w-11/12 mx-auto">
            <MainButton button_text="Save and Continue" />
            </div>

            
          </form>
        </div>
      </div>
    </>
  );
}

export default EnglishQualification;
