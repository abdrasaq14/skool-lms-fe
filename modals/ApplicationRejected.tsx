import React from 'react';
import Cancel from "/images/Cancelbad.png";
import MainButton from '../src/components/MainButton';


const ApplicationSuccessful: React.FC = () => {

  

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="success-container bg-white rounded-lg shadow-lg p-6 max-w-md">
        <div className="success-icon flex flex-col items-center justify-center">
          <img src={Cancel} alt="Success" className="justify-center" />
        </div>
        <div className="success-message text-center mt-4">
          <h2 className="text-xl font-semibold">Application Rejected Successfully!</h2>
          <div className="mt-5">
            <div className="flex flex-col gap-3 mx-auto bg-gray-200">
              {/* Pass the handleApproveApplication function with the application ID */}
              <MainButton button_text={"Close"}  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSuccessful;
