import MainButton from "../../components/MainButton";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import ApplicationHeader from "../../components/applicationComponents/ApplicationHeader";



function EmploymentDetails() {

    const [ answer, setAnswer ] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(answer)

        const res = await axiosInstance.post('/dashboard/application/employment-details', 
        answer)
        
        console.log(res.data)
    }

  return (
    <>
     <ApplicationHeader linkTo="/dashboard/application" header_text="Return to Application Home"/>

      <div className=" w-9/12 mx-auto text-center mt-12">
        
        <div className=" text-black w-3/12 mx-auto font-semibold text-2xl mb-4">
          <h3>Employment Details</h3>
        </div>
        <div>
          <p>
            Tell us about your past employment experience. If you don't have
            any, you can still apply.
          </p>
          <p>
            An offer on your application is more likely if it includes
            references
          </p>
        </div>

        <div>
          <form onSubmit={handleSubmit} className=" w-5/12 mx-auto mt-8 flex flex-col gap-3">

          <div className="w-9/12 mx-auto">
            <div className=" text-left mb-3">Do you have any work experience ?</div>

            
                <div>
              <label htmlFor="answerYes" className="flex justify-start gap-2 p">
                <input
                onChange={(e) => setAnswer(e.target.value)}
                  type="radio"
                  className=""
                  name="answer"
                  id="answerYes"
                  value="Yes"
                />
                <span className="">Yes</span>
              </label>
            </div>

            <div>
              <label htmlFor="answerNO" className="flex justify-start gap-2">
                <input
                onChange={(e) => setAnswer(e.target.value)}
                  type="radio"
                  className=""
                  name="answer"
                  id="answerNO"
                  value="No"
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

export default EmploymentDetails;
