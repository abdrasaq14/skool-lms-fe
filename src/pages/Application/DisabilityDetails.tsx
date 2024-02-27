import MainButton from "../../components/MainButton";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import ApplicationHeader from "../../components/applicationComponents/ApplicationHeader";


export default function DisabilityDetails(){
    const [ answer, setAnswer ] = useState("");
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(answer)

        const res = await axiosInstance.post('/dashboard/application/employment-details', 
        answer)
        
        console.log(res.data)
    }


    return (
        <>
         <ApplicationHeader header_text="Return to Application Home"/>
    
          <div className=" w-8/12 mx-auto text-center mt-12">
            
            <div className=" text-black w-3/12 mx-auto font-semibold text-2xl mb-4">
              <h3>Disability</h3>
            </div>
            <div>
              <p>
               Learning may be impacted by certain disabilities, so we want to help you from application to study. Learn more about our definition of a disability and the ways that our team can assist you. Nothing you are uncomfortable sharing has to be disclosed, and doing so won't have an impact on your application. If you would like, you can provide us with this information in the future.
              </p>
              <p>
                There are some courses that have competency requirements that we are unable to modify.Please use the button on the left to get in touch with us if you have any concerns about these might affect you.
              </p>
              <p>We can talk to you about reasonable adjustments, competency standards, and support arrangements as soon as you disclose your disability</p>
            </div>
    
            <div>
              <form onSubmit={handleSubmit} className=" w-5/12 mx-auto mt-8 flex flex-col gap-3">
    
              <div className="w-9/12 mx-auto">
                <div className=" text-left mb-3">Please select an option</div>
    
            
        
  <div className="relative mt-2 rounded-md shadow-sm  w-11/12">
    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
    </div>
    <input type="text" className="block rounded-md py-2.5 pl-7 pr-20" />
    <div className="absolute inset-y-0 right-0 flex items-center">
      <select id="currency" name="currency" className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
        <option>Physical Disabilities</option>
        <option>Sensory Disabilities</option>
        <option>Cognitive/Neurological Disabilities</option>
        <option>Psychiatric/Mental Health Disabilities</option>
        <option>Chronic Health Disabilities</option>
        <option>Invisible Disabilities</option>
        <option>Temporary Disabilities</option>
        <option>Developmental Disabilities</option>
        <option>Others/Prefer Not to say</option>
        <option>No Disability</option>
      </select>
    </div>

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

// className="block w-full rounded-md border-0 py-2.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"