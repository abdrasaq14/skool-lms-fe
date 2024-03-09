import React from 'react';
import MainButton from '../MainButton';
import failed from "/images/Cancelbad.png";

interface ApplicationFailedProps {
  message: string;
  buttonText: string;
}

const ApplicationFailed: React.FC<ApplicationFailedProps> = ({
  message,
  buttonText,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="success-container bg-white rounded-lg shadow-lg p-6 max-w-md">
        <div className="success-icon flex flex-col items-center justify-center">
          <img src={failed} alt="Failed" className="justify-center" />
        </div>
        <div className="success-message text-center mt-4">
          <h2 className="text-xl font-semibold">{message}</h2>
          <div className="mt-5">
            <div className="flex flex-col gap-3 mx-auto bg-gray-200">
              <MainButton button_text={buttonText} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationFailed;